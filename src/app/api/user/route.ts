import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb()
    const url = new URL(req.url);
    const username = url.searchParams.get("username") || "";
    const queryObject = {
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        username: true,
        dp: true,
        // Exclude the password field
      },
    };
    // Fetch user data from Prisma
    const fetchUser = await prisma.auth.findMany(queryObject);
    return NextResponse.json({ fetchUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
