import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.models";

/**
 * API route to handle user authentication (login/signup)
 * @route POST /api/create-account
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid request body", status: 400 },
        { status: 400 }
      );
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing credentials", status: 400 },
        { status: 400 }
      );
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return NextResponse.json(
        {
          message:
            "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
          status: 400,
        },
        { status: 400 }
      );
    }

    const normalizedUsername = username.toLowerCase().trim();
    const existingUser = await User.findOne({ username: normalizedUsername });

    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordCorrect) {
        return NextResponse.json(
          { message: "Incorrect password", status: 401 },
          { status: 401 }
        );
      }

      await User.findByIdAndUpdate(existingUser._id, {
        lastLogin: new Date(),
      });

      return NextResponse.json(
        {
          message: "Welcome back",
          status: 200,
          data: {
            id: existingUser._id.toString(),
            username: existingUser.username,
            isReceivingMessages: existingUser.isReceivingMessages,
          },
        },
        { status: 200 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: normalizedUsername,
      password: hashedPassword,
      isReceivingMessages: true,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        status: 201,
        data: {
          id: newUser._id.toString(),
          username: newUser.username,
          isReceivingMessages: newUser.isReceivingMessages,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Username already exists", status: 409 },
        { status: 409 }
      );
    }

    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}
