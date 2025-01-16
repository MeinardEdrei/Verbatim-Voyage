import mongoose from "mongoose";
const { Schema } = "mongoose";

const userSchema = new Schema({
  name: { type: string, required: true },
  email: { type: String, required: true },
  image: { type: String },
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model('User', userSchema);