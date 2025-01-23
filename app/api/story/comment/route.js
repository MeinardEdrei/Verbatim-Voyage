import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function POST(req) {
  await dbConnect();

  try {
    const { userId, storyId, userComment } = await req.json();

    const story = await Story.findById(storyId);
    story.comments.push({
      user: userId,
      commentText: userComment
    });
    await story.save();
    
    return new Response(JSON.stringify({ message: 'Comment success'}), 
    { status: 200 });
  } catch (error) {
    console.log('Comment API error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured. "}),
    { status: 500 });
  }
}