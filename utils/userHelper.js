import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function FindOrCreateUser({ name, email, image, provider, providerId }) {
  await dbConnect();
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image,
      provider,
      providerId,
    });
  }

  return user;
}
