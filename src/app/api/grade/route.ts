import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import getOrgId from '@/lib/getOrgId';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
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
        section: true,
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
