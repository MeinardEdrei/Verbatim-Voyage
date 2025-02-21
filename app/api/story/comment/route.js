import dbConnect from "@/lib/db";
import Notification from "@/models/Notification";
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

    Notification.create({
      type: 'Response',
      action: 'commented on your story',
      target: story.comments[story.comments.length - 1]._id,
      targetModel: 'Story',
      user: userId,
      recipient: story.author._id,
    });
    
    return new Response(JSON.stringify({ message: 'Comment success'}), 
    { status: 200 });
  } catch (error) {
    console.log('Comment API error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured. "}),
    { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const { storyId, commentId } = Object.fromEntries(req.nextUrl.searchParams);

    const story = await Story.findByIdAndUpdate(storyId, 
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!story) return new Response('Story not found', { status: 404 });

    await Notification.findOneAndDelete({ target: commentId });

    return new Response(JSON.stringify({ message: 'Comment deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('Delete Comment API error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured. "}),
    { status: 500 });
  }
}