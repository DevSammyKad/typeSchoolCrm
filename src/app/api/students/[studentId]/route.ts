import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET request to fetch specific student details by studentId
export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  const { studentId } = params;

  // Check if studentId is valid
  if (!studentId) {
    return NextResponse.json(
      { error: 'Missing or invalid studentId' },
      { status: 400 }
    );
  }

  try {
    // Fetch attendance records for the student
    const attendanceRecords = await prisma.studentAttendance.findMany({
      where: {
        studentId: studentId,
      },
    });

    // Count attendance by month
    const attendanceCountByMonth = attendanceRecords.reduce((acc, record) => {
      const monthYear = `${record.year}-${record.month}`;
      if (!acc[monthYear]) {
        acc[monthYear] = { month: record.month, year: record.year, count: 0 };
      }
      acc[monthYear].count += record.present ? 1 : 0; // Increment count if present
      return acc;
    }, {} as Record<string, { month: number; year: number; count: number }>);

    // Convert to an array for easier handling
    const result = Object.values(attendanceCountByMonth);
    console.log('attendanceCountByMonth', result);

    return NextResponse.json(attendanceCountByMonth, { status: 200 });
  } catch (error) {
    // Log and return a server error if any issues occur during data retrieval
    console.error('Error fetching student data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve student data' },
      { status: 500 }
    );
  }
}
