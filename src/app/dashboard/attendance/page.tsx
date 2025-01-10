import AttendanceClientPage from '@/app/components/dashboard/AttendanceClientPage';
import React from 'react';

// export const runtime = 'edge';

export const revalidate = 0;

const StudentAttendance = () => {
  return (
    <div>
      <AttendanceClientPage />
    </div>
  );
};

export default StudentAttendance;
