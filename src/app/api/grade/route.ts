import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

async function getOrganizationIdFromRequest(req: NextRequest): Promise<string> {
  return '6e6bd690-58ed-4d54-9037-893cd6cd45e8';
}

export async function GET(req: NextRequest) {
  try {
    const organizationId = await getOrganizationIdFromRequest(req);

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
