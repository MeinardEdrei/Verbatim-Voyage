import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET() {
  await dbConnect();

  try {
    const stories = await Story.find({}).lean();

    return new Response(JSON.stringify(stories), 
    { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return new Response(JSON.stringify({ message: "An unexpected error occurred." }),
    { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { title, caption, author, image, content, tags, status } = await req.json();

    if (!title?.trim() || !caption?.trim() || !image || !content?.length || !tags?.length || !status?.trim()) {
      return new Response(JSON.stringify({ error: "Missing required fields. "}),
      { status: 400 });
    }

    await Story.create({ 
      title, 
      caption, 
      image: image, 
      author: author, 
      content, 
      tags, 
      status 
    });

    return new Response(JSON.stringify({ message: "Story created successfully" }), 
    { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error creating story: ", error);
    return new Response(JSON.stringify({ message: "An unexpected error occurred. Please try again later." }),
    { status: 500 });
  }
}