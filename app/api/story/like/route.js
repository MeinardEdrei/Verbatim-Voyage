import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import User from "@/models/User";

export async function GET(req) {
  await dbConnect()

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

    const sendEvent = (data) => {
      writer.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    const interval = setInterval(async () => {
      try {
        const updatedStory = await Story.findById(storyId).select('likes comments');
        const isLiked = await User.findOne({ _id: userId, likedStories: storyId });

        if (!updatedStory) {
          clearInterval(interval);
          writer.close();
          return;
        }

        sendEvent({
          likes: updatedStory.likes,
          comments: updatedStory.comments,
          isLiked: !!isLiked,
        });
        
      } catch (error) {
        console.error("Error fetching updated story:", error);
      }
    }, 500);

    req.signal.addEventListener('abort', () => {
      clearInterval(interval);
      writer.close();
    });

    return new Response(readable, { headers });
  } catch (error) {
    console.log('User likes api error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { storyId, userId } = await req.json();
    const user = await User.findById(userId);
    const story = await Story.findById(storyId);

    if (!user.likedStories.includes(storyId)) {
      user.likedStories.push(storyId);
      story.likes += 1;
      await Promise.all([ user.save(), story.save()]);
    } else {
      user.likedStories.pull(storyId);
      story.likes -= 1;
      await Promise.all([ user.save(), story.save()]);
    }
    
    return new Response(JSON.stringify({ message: 'Like success'}),
    { status: 200 });
  } catch (error) {
    console.log('User likes api error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured. " }),
  { status: 500 });
  }
}