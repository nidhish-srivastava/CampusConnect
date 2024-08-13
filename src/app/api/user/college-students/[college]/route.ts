import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { college: string } }) {
  const { college } = params;
  
  try {
    // Fetch users with the specified college
    const response = await prisma.user.findMany({
      where: { college: college },
      select: {
        auth: {
          select: {
            username: true,
            dp: true
          }
        }
      }
    });
    
    // Extract auth details from response
    const result = response.map(user => user.auth);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
