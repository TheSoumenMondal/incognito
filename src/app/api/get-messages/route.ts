import dbConnect from "@/lib/db";
import User from "@/models/user.models";
import '@/models/message.models';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username query param is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username }).populate("messages");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Messages fetched", data: user.messages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}