import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import getOrgId from '@/lib/getOrgId';

export async function GET() {
  try {
    const organizationId = await getOrgId();

    if (!organizationId) {
      return new NextResponse('organizationId is required', { status: 400 });
    }

    // Fetch all grades for the organization
    const grades = await prisma.grade.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        students: true,
      },
    });

    // Return the grades as a JSON response
    // console.log('Grades', grades);
    return NextResponse.json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
      { status: 500 }
    );
  }
}
