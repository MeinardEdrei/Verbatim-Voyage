import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET(req) {
  await dbConnect();

  try {
    const { storyId } = req.json();
    
    const story = await Story
      .findById(storyId)
      .populate({
        path: 'author',
        select: 'name image'
      }).lean();

    return new Response(JSON.stringify(story), 
    { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.log("View api error:", error);
    return new Response(JSON.stringify({ message: "An unexpected error occured." }),
    { status: 500 });
  }
}