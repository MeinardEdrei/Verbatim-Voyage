import dbConnect from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET(req) {
  await dbConnect();

  try {
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
      writer.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    const interval = setInterval(async () => {
      try {
        const updatedNotifications = await Notification.find({ recipient: userId })
        .populate({
          path: 'user',
          select: 'name image'
        })
        .populate('target')
        .sort({ createdAt: -1 })
        .exec();

        updatedNotifications.forEach((notification) => {
          sendEvent({
            name: notification.name,
            image: notification.image,
            type: notification.type,
            action: notification.action,
            target: notification.target,
            date: notification.createdAt,
          });
        });

      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }, 500);

    req.signal.addEventListener('abort', () => {
      clearInterval(interval);
      writer.close();
    });

    return new Response(readable, { headers });
  } catch (error) {
    console.log('Notification stream API error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}