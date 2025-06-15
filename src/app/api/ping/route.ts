import prisma from "@/prisma/connetToPrisma";
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Required for scheduled functions on Vercel
export const revalidate = 0;

// Vercel schedule: every 12 hours
export const config = {
  schedule: '0 7 */3 * *',
};

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Pinged Postgres');
    return NextResponse.json({ status: 'Pinged Postgres' });
  } catch (err) {
    console.error('❌ Ping failed:', err);
    return NextResponse.json({ status: 'Failed to ping DB' }, { status: 500 });
  }
}
