import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET(req) {
  await dbConnect();

  try {
    const userId = req.nextUrl.searchParams.get('userId');

    const userStories = await Story.find({
      author: userId
    }).lean();

    return new Response(JSON.stringify(userStories, { message: 'Fetch user stories success'},
      { status: 200, headers: { 'Content-Type' : 'application/json' }}))
  } catch (error) {
    console.log('User stories API error:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occured.', error: error },
      { status: 500, headers: { 'Content-Type' : 'application/json' } } ) );
  }
}