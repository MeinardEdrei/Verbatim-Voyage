import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { transformation } = await req.json();
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { transformation, timestamp },
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