'use client';
import { useState, useEffect } from 'react';
import { PhoneCall, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import moment from 'moment';
import axios from 'axios';

interface AttendanceData {
  month: string;
  attendance: number;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface StudentDetailsDrawerProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const initialChartData: AttendanceData[] = [
  { month: 'January', attendance: 16 },
  { month: 'February', attendance: 30 },
  { month: 'March', attendance: 23 },
  { month: 'April', attendance: 7 },
  { month: 'May', attendance: 29 },
  { month: 'June', attendance: 14 },
  { month: 'July', attendance: 10 },
  { month: 'August', attendance: 20 },
  { month: 'September', attendance: 30 },
  { month: 'October', attendance: 22 },
  { month: 'November', attendance: 10 },
  { month: 'December', attendance: 30 },
];

const chartConfig: ChartConfig = {
  attendance: {
    label: 'Attendance',
    color: 'hsl(var(--chart-1))',
  },
};

const StudentDetailsDrawer: React.FC<StudentDetailsDrawerProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const [chartData, setChartData] =
    useState<AttendanceData[]>(initialChartData);

  useEffect(() => {
    if (student && isOpen) {
      fetchAttendanceData(student.id);
    }
  }, [student, isOpen]);

  const fetchAttendanceData = async (studentId: number) => {
    try {
      const response = await axios.get(`/api/students/${studentId}`);

      console.log('Attendance Count', response.data);

      if (response.status === 200) {
        const attendanceData = response.data;

        // Define all months in sequence for display
        // const allMonths = Array.from({ length: 12 }, (_, i) => ({
        //   month: moment(i + 1, 'M').format('MMMM'), // Format as month name
        //   attendance: 0, // Default to 0
        // }));

        // // Populate attendance counts from API response into the allMonths array
        // Object.keys(attendanceData).forEach((key) => {
        //   const { month, count } = attendanceData[key];
        //   allMonths[month - 1].attendance = count; // Update count in the correct month index
        // });

        // Fill data with months, using a default of 0 if no data exists for a month
        const months = Array.from({ length: 12 }, (_, i) => {
          const date = moment().month(i);
          const monthKey = date.format('YYYY-M');
          const monthName = date.format('MMMM');
          return {
            month: monthName,
            attendance: attendanceData[monthKey]?.count || 0,
          };
        });

        setChartData(months);
      } else {
        console.error('Failed to fetch attendance data');
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  if (!student) return null;

  const currentMonthIndex = moment().month();
  const visibleData = chartData.slice(
    Math.max(0, currentMonthIndex - 5),
    currentMonthIndex + 1
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-5 flex items-center justify-between">
            <p>
              {student.firstName} {student.lastName}
            </p>
            <a href={`tel:${student.phoneNumber}`} className="text-xs">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => console.log('Call Now', student.phoneNumber)}
              >
                <PhoneCall className="h-5 w-5" /> Call
              </Button>
            </a>
          </SheetTitle>
          <SheetDescription className="mt-2">
            Here you can see your Student&#39;s Attendance Chart and more.
          </SheetDescription>
        </SheetHeader>
        <Card className="my-2">
          <CardHeader>
            <CardTitle>Attendance Chart</CardTitle>
            <CardDescription className="text-sm">
              {chartData.length > 0
                ? `January - December ${moment(
                    chartData[chartData.length - 1].month,
                    'MMMM'
                  ).format('YYYY')}`
                : 'Data is not available'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <ChartContainer config={chartConfig}>
                <BarChart width={800} height={300} data={visibleData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={5}
                    axisLine={false}
                    interval={0}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="attendance"
                    fill="var(--color-attendance)"
                    radius={5}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Happy New Year <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Kesa laga mera majak
            </div>
          </CardFooter>
        </Card>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Send Fee&#39;s Reminder</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StudentDetailsDrawer;
