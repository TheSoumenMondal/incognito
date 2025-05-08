import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  isReceivingMessages: boolean;
  messages: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    isReceivingMessages: { 
      type: Boolean, 
      default: true 
    },
    messages: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Message",
      default: [] 
    }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
