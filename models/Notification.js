import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
  type: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: Schema.Types.ObjectId, refPath: 'targetModel' },
  targetModel: { type: String, enum: ['Story', 'User'] },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);