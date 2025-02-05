import mongoose from "mongoose";
const { Schema } = mongoose;

const storySchema = new Schema ({
  title: { type: String },
  caption: { type: String },
  content: { type: Array, default: [] },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  comments: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ 
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
     }],
    commentText: { type: String, required: true },
    replies: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      likes: { type: Number, default: 0 },
      replyText: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    }],
    createdAt: { type: Date, default: Date.now },
  }],
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Story || mongoose.model('Story', storySchema);