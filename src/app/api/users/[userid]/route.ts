import { connectDB } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

interface UserProps {
  params: {
    userid: string;
  };
}

export async function GET(request: NextRequest, { params }: UserProps) {
  try {
    await validateJWT(request);

    const user = await User.findById(params.userid).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return NextResponse.json({
      message: 'User data fetched successfully',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
