import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET({ params }) {
  await dbConnect();

  try {
    const { storyId } = params;
    const story = await Story.findById(storyId).lean();

    return new Response(JSON.stringify(story), 
    { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}