'use client';

import React, { useState } from 'react';
import { deleteHoliday } from '@/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableCaption,
  TableHead,
  TableFooter,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'full',
});

interface Holiday {
  id: number;
  name: string;
  description: string | null;
  date: Date;
}

interface HolidaysTableProps {
  initialHolidays: Holiday[];
}

const HolidaysTable: React.FC<HolidaysTableProps> = ({ initialHolidays }) => {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);

  const handleDelete = async (id: number) => {
    const response = await deleteHoliday(id);
    if (response.success) {
      setHolidays((prev) => prev.filter((holiday) => holiday.id !== id));
      toast.success('Holiday deleted successfully');
    } else {
      toast.error(response.error || 'Error deleting holiday');
    }
  };

  return (
    <Table>
      <TableCaption>A list of Holidays.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead colSpan={2}>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holidays.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              Please upload holidays list of CSV.
            </TableCell>
          </TableRow>
        ) : (
          holidays.map((holiday) => (
            <TableRow key={holiday.id}>
              <TableCell className="font-medium">{holiday.name}</TableCell>
              <TableCell>{holiday.description}</TableCell>
              <TableCell colSpan={2} className="tabular-nums">
                {dateFormat.format(new Date(holiday.date))}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(holiday.id)}
                >
                  <Trash2
                    className="text-red-400 hover:text-red-500"
                    size="20"
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Holidays</TableCell>
          <TableCell className="text-right">{holidays.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default HolidaysTable;
