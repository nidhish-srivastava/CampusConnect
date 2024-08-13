import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/connetToPrisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "@/prisma/connectToDb";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { username, password } = await req.json();
    const user = await prisma.auth.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 403 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ username }, process.env.SECRET!, {
        expiresIn: "1d",
      });

      // Create a response with the token cookie
      const response = NextResponse.json({ message: "Logged in successfully" });

      // Set the cookie
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        maxAge: 24 * 60 * 60, // 1 day
        path: "/", // Cookie is accessible on all paths
      });

      return response;
    } else {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
