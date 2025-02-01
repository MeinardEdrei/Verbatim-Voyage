import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();

  try {
    const { username, userId } = Object.fromEntries(req.nextUrl.searchParams);

    const user = await User.findByIdAndUpdate(
      userId,
      { name: username },
      { new: true }
    );

    if (!user) return new Response('User not found', { status: 404 });

    return new Response(JSON.stringify({ message: 'User profile updated.', user}),
    { status: 200 });
  } catch (error) {
    console.error('Update profile API error:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occured.', error: error }),
    { status: 500, headers: { 'Content-Type' : 'application/json' } } );
  }
}