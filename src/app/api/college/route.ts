import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    // Fetch all college records from the database
    const response = await prisma.college.findMany();

    // Return the first college record if available
    if (response.length > 0) {
      return NextResponse.json(response[0]);
    } else {
      return NextResponse.json(
        { message: "No colleges found" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { college } = await req.json();
    // Update the College record by adding the new college to the list
    const updatedCollege = await prisma.college.update({
      where: { id: 1 },
      data: {
        colleges: {
          push: college,
        },
      },
    });

    return NextResponse.json(updatedCollege);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
