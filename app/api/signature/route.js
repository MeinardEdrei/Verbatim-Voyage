import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { public_id, folderPath } = await req.json();

    if (!public_id) {
      return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { public_id, timestamp, folder: folderPath },
      process.env.CLOUDINARY_API_SECRET
    )

    return new Response(JSON.stringify({ signature, timestamp }), 
    { status: 200, headers: { 'Content-Type' : 'application/json' }});
  } catch (error) {
    console.error("Error creating story: ", error);
    return new Response(JSON.stringify({ message: "An unexpected error occurred. Please try again later." }),
    { status: 500 });
  }
}