import mongoose from "mongoose";
const { Schema } = mongoose;

const storySchema = new Schema ({
  title: { type: String, required: true },
  caption: { type: String, required: true },
  content: { type: Array, required: true },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  comments: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Story || mongoose.model('Story', storySchema);