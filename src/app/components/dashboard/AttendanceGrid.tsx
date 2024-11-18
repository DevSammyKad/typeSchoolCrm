// Frontend Component
'use client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'sonner';
import StudentDetailsDrawer from './StudentDetailsDrawer';

interface AttendanceRecord {
  id: number;
  firstName: string;
  lastName: string;
  student_attendance: { day: number; present: boolean }[];
  phoneNumber: string;
}

interface AttendanceGridProps {
  attendanceList: AttendanceRecord[];
  selectedMonth: Date;
  overRideLock: boolean;
}

const AttendanceGrid: React.FC<AttendanceGridProps> = ({
  attendanceList,
  selectedMonth,
  overRideLock,
}) => {
  const [rowData, setRowData] = useState<AttendanceRecord[]>([]);
  const [colDefs, setColDefs] = useState<any[]>([
    {
      field: 'firstName',
      filter: true,
      headerName: 'First Name',
      pinned: 'left',
    },
    {
      field: 'lastName',
      filter: true,
      headerName: 'Last Name',
      pinned: 'left',
    },
  ]);

  const [selectedStudent, setSelectedStudent] =
    useState<AttendanceRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const daysInMonth = (year: number, month: number) =>
      new Date(year, month, 0).getDate();
    const numberOfDays = daysInMonth(
      moment(selectedMonth).year(),
      moment(selectedMonth).month() + 1
    );

    const today = moment();
    const selectedDate = moment(selectedMonth);

    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
    const newColDefs = [
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
      ...daysArray.map((day) => {
        const date = selectedDate.clone().date(day);
        const isPast = date.isBefore(today, 'day');
        const isToday = date.isSame(today, 'day');
        const isFuture = date.isAfter(today, 'day');
        return {
          field: `day${day}`,
          headerName: `${day}`,
          width: 50,
          editable: overRideLock || (!isPast && !isFuture),
          cellStyle: () => {
            if (isToday) {
              return { backgroundColor: '#e6f7ff' };
            }
            return null;
          },
          cellRendererFramework: (params: any) => (
            <input
              type="checkbox"
              checked={params.value}
              onChange={(e) => params.setValue(e.target.checked)}
              disabled={!overRideLock && (isPast || isFuture)}
            />
          ),
        };
      }),
    ];
    setColDefs(newColDefs);

    const userList = getUniqueRecord();
    setRowData(userList);

    function getUniqueRecord() {
      const uniqueRecord: AttendanceRecord[] = [];
      const existingUser = new Set<number>();

      attendanceList.forEach((record) => {
        if (!existingUser.has(record.id)) {
          existingUser.add(record.id);
          const studentAttendance = daysArray.reduce((acc, day) => {
            acc[`day${day}`] = false;
            return acc;
          }, {} as { [key: string]: boolean });
          record.student_attendance.forEach((attendance) => {
            studentAttendance[`day${attendance.day}`] = attendance.present;
          });
          uniqueRecord.push({ ...record, ...studentAttendance });
        }
      });

      return uniqueRecord;
    }
  }, [attendanceList, selectedMonth, overRideLock]);

  const onMarkAttendance = async (
    dayField: string,
    studentId: number,
    presentStatus: boolean
  ) => {
    const day = parseInt(dayField.replace('day', ''), 10);
    const data = {
      studentId,
      day,
      month: moment(selectedMonth).month() + 1,
      year: moment(selectedMonth).year(),
      present: presentStatus,
    };

    try {
      const response = await axios.post('/api/students-attendance', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Attendance marked successfully');
      } else {
        console.error('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCellValueChanged = (e: any) => {
    const { data, newValue, colDef } = e;
    const dayField = colDef.field;
    const studentId = data.id;
    const presentStatus = newValue;

    onMarkAttendance(dayField, studentId, presentStatus);
  };

  const onRowClicked = (event: any) => {
    setSelectedStudent(event.data);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          suppressHorizontalScroll={true}
          onCellValueChanged={handleCellValueChanged}
          onRowClicked={onRowClicked}
        />
      </div>
      <div>
        {selectedStudent && (
          <StudentDetailsDrawer
            student={selectedStudent}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceGrid;
