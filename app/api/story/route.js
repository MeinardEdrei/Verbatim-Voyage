import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET() {
  await dbConnect();

  try {
    const stories = await Story.find({}).populate({
      path: 'author',
      select: 'name image',
    }).lean();

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
    
    const missingField = 
      !title ? 'title' :
      !caption ? 'caption' :
      !image ? 'image' :
      !content?.blocks?.length ? 'content' :
      !tags?.length ? 'tags' :
      !status ? 'status' : null;

    if (missingField) {
      return new Response(
        JSON.stringify({ error: `Missing required field: ${missingField}` }),
        { status: 400 }
      );
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