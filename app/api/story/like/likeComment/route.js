import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function POST(req) {
  await dbConnect();

  try {
    const { storyId, commentId, userId } = Object.fromEntries(req.nextUrl.searchParams);
    const story = await Story.findById(storyId);
    const comment = await story.comments.id(commentId);
    
    if ((comment.likes.findIndex(item => item._id.toString() === userId.toString())) === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.pull(userId);
    }

    await story.save();
    
    return new Response(JSON.stringify({ message: 'Like comment success' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log('Like comment API error:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occured.'}),
    { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}