import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/user.models";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    await dbConnect();

    const existingUser = await User.findOne({ username }).lean();

    return NextResponse.json({
      isUnique: !existingUser,
      message: existingUser
        ? "Username already taken. If this is you, please click next"
        : "Username is available",
    });
  } catch (error) {
    console.error("Username check error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
