import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import getOrgId from '@/lib/getOrgId';

export async function GET(
  req: NextRequest,
  { params }: { params: { gradeId: string } }
) {
  const { gradeId } = params;

  try {
    if (!gradeId) {
      return new NextResponse('Grade ID is required', { status: 400 });
    }

    const organizationId = await getOrgId();

    if (!organizationId) {
      return new NextResponse('Organization ID is required', { status: 400 });
    }

    const sections = await prisma.section.findMany({
      where: {
        organizationId,
        gradeId: gradeId,
      },
      include: {
        students: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch sections' }),
      { status: 500 }
    );
  }
}
