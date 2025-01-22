import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET(req) {
  await dbConnect();

  try {
    const storyId = req.nextUrl.searchParams.get('storyId');

    const story = await Story.findById(storyId).select('likes comments');

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

    const interval = setInterval(() => {
      sendEvent({
        likes: story.likes,
        comments: story.comments,
      });
    }, 1000);

    req.signal.addEventListener('abort', () => {
      clearInterval(interval);
      writer.close();
    });

    return new Response(readable, { headers });
  } catch (error) {
    console.log("Likes and Comments stream error:", error);
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}