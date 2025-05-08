import dbConnect from "@/lib/db";
import Message from "@/models/message.models";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await Message.deleteMany({ owner: userId });

    user.messages = [];
    await user.save();

    return NextResponse.json(
      { message: "All messages deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting messages:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
