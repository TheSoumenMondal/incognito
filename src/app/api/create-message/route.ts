import dbConnect from "@/lib/db";
import Message from "@/models/message.models";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { content, senderName, owner_id } = await req.json();

    if (!content || !senderName || !owner_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findById(owner_id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isReceivingMessages) {
      return NextResponse.json(
        { message: "User is not accepting messages at the moment." },
        { status: 403 }
      );
    }

    const newMessage = await Message.create({
      content,
      senderName,
      owner: owner_id,
    });

    await User.findByIdAndUpdate(owner_id, {
      $push: { messages: newMessage._id },
    });

    return NextResponse.json(
      { message: "Message created successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
