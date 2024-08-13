import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma  = new PrismaClient()

export async function GET(req : NextRequest){
    try {
        // Fetch all college records from the database
        const response = await prisma.college.findMany();
        
        // Return the first college record if available
        if (response.length > 0) {
          return NextResponse.json(response[0]);
        } else {
          return NextResponse.json({ message: 'No colleges found' }, { status: 404 });
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }
}

export async function POST(req: NextRequest) {
  try {
    const { college } = await req.json();

    // Update the College record by adding the new college to the list
    const updatedCollege = await prisma.college.update({
      where: { id: 1 },
      data: {
        colleges: {
          push: college
        }
      }
    });

    return NextResponse.json(updatedCollege);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}