// src/pages/api/student_attendance.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Helper function to extract organization ID
async function getOrganizationIdFromRequest(req: NextRequest): Promise<string> {
  return '6e6bd690-58ed-4d54-9037-893cd6cd45e8';
}

// POST: Mark attendance for a student
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, present, day, month, year } = body;

    if (
      !studentId ||
      typeof day !== 'number' ||
      typeof month !== 'number' ||
      typeof year !== 'number' ||
      typeof present !== 'boolean'
    ) {
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const organizationId = await getOrganizationIdFromRequest(req);

    const student = await prisma.student.findFirst({
      where: { id: studentId, organizationId },
    });

    if (!student) {
      return new NextResponse('Student not found in organization', {
        status: 404,
      });
    }

    const attendanceRecord = await prisma.studentAttendance.upsert({
      where: {
        studentId_day_month_year: { studentId, day, month, year },
      },
      update: { present, updatedAt: new Date() },
      create: {
        studentId,
        present,
        day,
        month,
        year,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(attendanceRecord, { status: 200 });
  } catch (error) {
    console.error('Internal Server error:', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}

// GET: Fetch attendance records
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get('month') || '', 10);
    const year = parseInt(searchParams.get('year') || '', 10);
    const grade = searchParams.get('grade') || '';
    const studentId = searchParams.get('studentId');

    const organizationId = await getOrganizationIdFromRequest(req);

    if (studentId) {
      const attendanceCount = await prisma.studentAttendance.count({
        where: {
          studentId,
          month,
          year,
          student: { organizationId },
        },
      });
      return NextResponse.json(
        { studentId, month, year, attendanceCount },
        { status: 200 }
      );
    } else if (!isNaN(month) && !isNaN(year) && grade) {
      const students = await prisma.student.findMany({
        where: { grade: { grade }, organizationId },
        include: { student_attendance: { where: { month, year } } },
      });
      return NextResponse.json(students, { status: 200 });
    } else {
      return new NextResponse('Invalid query parameters', { status: 400 });
    }
  } catch (error) {
    console.error('Internal Server error:', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}
