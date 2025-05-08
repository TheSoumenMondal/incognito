import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { isAccepting, username } = body;

    // More specific type checking
    if (typeof isAccepting !== "boolean") {
      return NextResponse.json(
        { message: "isAccepting must be a boolean" },
        { status: 400 }
      );
    }

    if (typeof username !== "string" || !username.trim()) {
      return NextResponse.json(
        { message: "username must be a non-empty string" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { username: username.trim() },
      { isReceivingMessages: isAccepting },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: user,
      message: "Update successful"
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
