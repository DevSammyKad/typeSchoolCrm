'use client';
import React, { useState } from 'react';
import MonthSelection from '../../components/dashboard/MonthSelection';
import { Button } from '@/components/ui/button';
import GradeSelect from '../../components/dashboard/GradeSelect';
import AttendanceGrid from '../../components/dashboard/AttendanceGrid';

import moment from 'moment';
import axios from 'axios';
// import AttendanceCard from '@/app/components/dashboard/AttendanceCard';

interface AttendanceRecord {
  id: number;
  firstName: string;
  lastName: string;
  student_attendance: { day: number; present: boolean }[];
  phoneNumber: string;
}

const StudentAttendance: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [overRideLock, setOverRideLock] = useState(false);

  const toggleOverRideLock = () => setOverRideLock(!overRideLock);

  const fetchAttendanceData = async () => {
    const month = moment(selectedMonth).format('MM');
    const year = moment(selectedMonth).format('YYYY');
    try {
      const response = await axios.get('/api/students-attendance', {
        params: { year, month, grade: selectedGrade },
      });
      if (response.status === 200) setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  return (
    <div>
      <div className="my-10 flex items-center justify-between">
        <h1>Student Attendance</h1>
        <div className="flex items-center gap-5">
          <Button onClick={toggleOverRideLock} variant="outline">
            OverRide
          </Button>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect
            selectedGrade={setSelectedGrade}
            defaultGrade={selectedGrade}
          />
          <Button
            onClick={fetchAttendanceData}
            disabled={!selectedGrade}
            className="disabled:cursor-not-allowed"
          >
            Search
          </Button>
        </div>
      </div>
      {/* <AttendanceCard selectedMonth={selectedMonth} /> */}
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
        overRideLock={overRideLock}
        // onMarkAttendance={markAttendance}
      />
    </div>
  );
};

export default StudentAttendance;
