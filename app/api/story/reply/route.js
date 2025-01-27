import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function POST(req) {
  await dbConnect();

  try {
    const { storyId, commentId, replyText, userId } = Object.fromEntries(req.nextUrl.searchParams);

    const story = await Story.findById(storyId);
    const comment = await story.comments.id(commentId);

    comment.replies.push({
      user: userId,
      replyText: replyText,
    });

    await story.save();

    return new Response(JSON.stringify({ message: 'Reply sent'}),
    { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log('Reply API error: ', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occured. '}), 
    { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}