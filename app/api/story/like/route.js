import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await dbConnect()

  try {
    const storyId = req.nextUrl.searchParams.get('storyId');
    const userId = req.nextUrl.searchParams.get('userId');

    const isLiked = await User.findOne({ _id: userId, likedStories: storyId });

    return new Response(JSON.stringify(!!isLiked), // converted to boolean by using (!!)
    { status: 200 });
  } catch (error) {
    console.log('User likes api error:', error);
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}