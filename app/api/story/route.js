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

export async function PUT(req) {
  await dbConnect();

  try {
    const { id, title, caption, author, image, content, tags, status } = await req.json();
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Story ID is required for updates' }),
        { status: 400 }
      );
    }

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { 
        title, 
        caption, 
        image, 
        author, 
        content, 
        tags, 
        status 
      },
      { new: true }
    );

    if (!updatedStory) {
      return new Response(
        JSON.stringify({ error: 'Story not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Story updated successfully", story: updatedStory }), 
      { status: 200, headers: { 'Content-Type' : 'application/json' } }
    );
  } catch (error) {
    console.error("Error updating story API: ", error);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred. Please try again later." }),
      { status: 500, headers: { 'Content-Type' : 'application/json' } }
    );
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const storyId = req.nextUrl.searchParams.get('storyId');
    
    if (!storyId) {
      return new Response(
        JSON.stringify({ error: 'Story ID is required' }),
        { status: 400 }
      );
    }

    const story = await Story.findByIdAndDelete(storyId);

    if (!story) {
      return new Response(
        JSON.stringify({ error: 'Story not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Story deleted successfully" }), 
      { status: 200, headers: { 'Content-Type' : 'application/json' } }
    );
  } catch (error) {
    console.error("Error deleting story API: ", error);
    return new Response(
      JSON.stringify({ message: "An unexpected error occurred. Please try again later." }),
      { status: 500, headers: { 'Content-Type' : 'application/json' } }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { title, caption, author, image, content, tags, status } = await req.json();
    
    // const missingField = 
    //   !title ? 'title' :
    //   !caption ? 'caption' :
    //   !image ? 'image' :
    //   !content?.blocks?.length ? 'content' :
    //   !tags?.length ? 'tags' :
    //   !status ? 'status' : null;

    // if (missingField) {
    //   return new Response(
    //     JSON.stringify({ error: `Missing required field: ${missingField}` }),
    //     { status: 400 }
    //   );
    // }

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