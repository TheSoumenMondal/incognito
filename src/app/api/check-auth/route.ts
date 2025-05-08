// Updated API route
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.models";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    return NextResponse.json(
      { success: isMatch },
      { status: isMatch ? 200 : 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
