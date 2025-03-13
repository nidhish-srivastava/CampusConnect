import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  try {
    await connectDb();
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        auth: {
          select: {
            username: true,
            dp: true,
          },
        },
        followers: {
          select: {
            id: true,
            username: true,
          },
        },
        following: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 403 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
