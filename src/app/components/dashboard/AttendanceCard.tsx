// AttendanceCard.tsx

import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import moment from 'moment';
import prisma from '@/lib/db';

const AttendanceCard = async ({ selectedMonth }: { selectedMonth: Date }) => {
  const daysInMonth = moment(selectedMonth).daysInMonth();
  const month = selectedMonth.getMonth() + 1; // Adjust for JavaScript's 0-indexed months
  const year = selectedMonth.getFullYear();

  const attendanceRecords = await prisma.studentAttendance.findMany({
    where: {
      month,
      year,
    },
  });

  // 1. Calculate overall attendance rate
  const totalDays = daysInMonth * attendanceRecords.length;
  const daysAttended = attendanceRecords.filter(
    (record) => record.present
  ).length;
  const overallAttendanceRate = ((daysAttended / totalDays) * 100).toFixed(2);

  // 2. Calculate highest attendance day
  const attendanceByDay = Array.from({ length: daysInMonth }, (_, day) => ({
    day: day + 1,
    count: attendanceRecords.filter(
      (record) => record.day === day + 1 && record.present
    ).length,
  }));

  const highestAttendanceDay = attendanceByDay.reduce((max, current) =>
    current.count > max.count ? current : max
  );

  // 3. Calculate lowest attendance day
  const lowestAttendanceDay = attendanceByDay.reduce((min, current) =>
    current.count < min.count ? current : min
  );

  // 4. Calculate average daily attendance
  const totalAttendanceCount = attendanceByDay.reduce(
    (sum, day) => sum + day.count,
    0
  );
  const averageDailyAttendance = (totalAttendanceCount / daysInMonth).toFixed(
    2
  );

  const data = [
    {
      name: 'Overall Attendance Rate',
      stat: `${overallAttendanceRate}%`,
      changeType: 'positive',
    },
    {
      name: 'Highest Attendance Day',
      stat: `${highestAttendanceDay.day} - ${highestAttendanceDay.count} students`,
      changeType: 'positive',
    },
    {
      name: 'Lowest Attendance Day',
      stat: `${lowestAttendanceDay.day} - ${lowestAttendanceDay.count} students`,
      changeType: 'negative',
    },
    {
      name: 'Average Daily Attendance',
      stat: `${averageDailyAttendance} students`,
      changeType: 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <Card key={item.name}>
          <CardContent>
            <div className="flex items-center justify-between p-5">
              <p className="text-tremor-default font-medium">{item.name}</p>
            </div>
            <p className="text-tremor-metric font-semibold p-5">{item.stat}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceCard;
