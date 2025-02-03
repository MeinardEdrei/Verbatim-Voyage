import dbConnect from "@/lib/db";

export async function POST(req) {
  await dbConnect();

  try {
    const storyId = req.nextUrl.searchParams.get('userId');

    return new Response(JSON.stringify({ message: 'Story saved to drafts successfully', storyId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('Draft api error:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occured', error: error },
      { status: 500, headers: { 'Content-Type' : 'application/json' } }
    ));
  }
}