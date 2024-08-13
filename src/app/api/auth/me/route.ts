import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/connetToPrisma";
import { connectDb } from "@/prisma/connectToDb";
export async function GET(req: NextRequest) {
  await connectDb()
  const token = req.cookies.get("token")?.value; // `.value` to get the cookie value
  if (token) {
    try {
      // Verify the token with string typing for process.env.SECRET
      const user: any = jwt.verify(token, process.env.SECRET as string);
      const result: any = await prisma.auth.findUnique({
        where: { username: user?.username },
      });
      return NextResponse.json({
        username: result.username,
        id: result.id,
        dp: result.dp,
      });
    } catch (err) {
      console.error("Token verification error:", err);
      return new NextResponse("Forbidden", { status: 403 });
    }
  } else {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
