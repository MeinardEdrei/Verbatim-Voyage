import mongoose from "mongoose";
const { Schema } = mongoose;

const storySchema = new Schema ({
  title: { type: String, required: true },
  content: { type: Object, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Story || mongoose.model('Story', storySchema);