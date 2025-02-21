import dbConnect from "@/lib/db";
import Notification from "@/models/Notification";
import Story from "@/models/Story";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();

  try {
    const { storyId, userId } = await req.json();
    const user = await User.findById(userId);
    const story = await Story.findById(storyId);

    if (!user.likedStories.includes(storyId)) {
      user.likedStories.push(storyId);
      story.likes += 1;

      await Notification.create({
        type: 'Like',
        action: 'liked your story',
        target: story._id,
        targetModel: 'Story',
        user: userId,
        recipient: story.author._id,
      });

    } else {
      user.likedStories.pull(storyId);
      story.likes -= 1;

      await Notification.findOneAndDelete({ type: 'Like', target: storyId, user: userId });
    }

    await Promise.all([ user.save(), story.save()]);

    return new Response(JSON.stringify({ message: 'Like success'}),
    { status: 200 });
  } catch (error) {
    console.log('User likes api error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured. " }),
  { status: 500 });
  }
}