import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await dbConnect();

  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const user = await User.findById(userId)
      .select('likedStories')
      .lean();

    if (!user) return new Response('User not found', { status: 404 });

    return new Response(JSON.stringify(user),
    { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.log('Fetching user API error:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occured.', error: error }),
    { status: 500, headers: { 'Content-Type' : 'application/json' } } );
  }
}