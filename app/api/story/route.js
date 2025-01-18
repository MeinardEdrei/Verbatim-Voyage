import { useUserSession } from "@/app/utils/SessionContext";
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
  const session = useUserSession();

  try {
    const { title, caption, image, content, tags, status } = await req.json();

    if (!title?.trim() || !caption?.trim() || !image || !content?.length || !tags?.length || !status?.trim()) {
      return new Response(JSON.stringify({ error: "Missing required fields. "}),
      { status: 400 });
    }

    const user = session.userSession.user.id;

    await Story.create({ 
      title, 
      caption, 
      image, 
      author: user, 
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