import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import User from "@/models/User";

export async function GET(req) {
  await dbConnect();

  try {
    const storyId = req.nextUrl.searchParams.get('storyId');
    const userId = req.nextUrl.searchParams.get('userId');

    const { readable, writable } = new TransformStream();

    const headers = new Headers({
      'Content-Type' : 'text/event-stream',
      'Cache-Control' : 'no-cache',
      'Connection' : 'keep-alive',
      'Transfer-Encoding' : 'chunked',
    });

    const writer = writable.getWriter();

    let isConnectionActive = true;

    const sendEvent = (data) => {
      if (isConnectionActive) {
        writer.write(`data: ${JSON.stringify(data)}\n\n`)
      }
    }

    const interval = setInterval(async () => {
      try {
        const updatedStory = await Story.findById(storyId)
          .select('likes comments')
          .populate({
            path: 'comments.user',
            select: 'name image',
          })
          .populate({
            path: 'comments.replies.user',
            select: 'name image',
          })
          .lean();
        
        const isLiked = await User.findOne({ _id: userId, likedStories: storyId });

        sendEvent({
          likes: updatedStory.likes,
          comments: updatedStory.comments,
          name: updatedStory.name,
          image: updatedStory.image,
          isLiked: !!isLiked,
        });
        
      } catch (error) {
        console.error("Error fetching updated story:", error);
      }
    }, 500);

    req.signal.addEventListener('abort', () => {
      clearInterval(interval);
      writer.close();
      isConnectionActive = false;
    });

    return new Response(readable, { headers });
  } catch (error) {
    console.log('User likes api error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}