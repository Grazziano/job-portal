import { connectDB } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connectDB();

export async function PUT(request: NextRequest) {
  try {
    await validateJWT(request);

    const reqBody = await request.json();
    const updatedUser = await User.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      throw new Error('No user found');
    }

    return NextResponse.json({
      message: 'User data updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}
