import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
  content: string;
  senderName?: string;
  owner?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    senderName: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
