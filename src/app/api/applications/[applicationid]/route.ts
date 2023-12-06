import { connectDB } from '@/config/dbConfig';
import { sendEmail } from '@/helpers/sendEmail';
import { validateJWT } from '@/helpers/validateJWT';
import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

interface JobParamsProps {
  params: {
    applicationid: string;
  };
}

export async function PUT(request: NextRequest, { params }: JobParamsProps) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const application = await Application.findByIdAndUpdate(
      params.applicationid,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    ).populate('user');

    await sendEmail({
      to: application?.user?.email,
      subject: 'Your application status has been updated',
      text: `Your application status has been updated to ${application?.status}`,
      html: `<div>
                <p>Your application status has been updated to ${application?.status}</p>
                <br />
                <p>Tank you for using Jobs Portal</p>
              </div>`,
    });

    return NextResponse.json({
      message: 'Application updated successfully',
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
