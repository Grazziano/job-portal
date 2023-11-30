import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/dbConfig';

connectDB();

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'POST' });
}
