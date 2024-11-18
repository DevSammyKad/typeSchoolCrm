'use client';
import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addMonths } from 'date-fns';
import moment from 'moment';
import { Calendar } from '@/components/ui/calendar';

interface MonthSelectionProps {
  selectedMonth: (value: Date) => void;
}

const MonthSelection: React.FC<MonthSelectionProps> = ({ selectedMonth }) => {
  const today = new Date();
  const nextMonths = addMonths(today, 0);
  const [month, setMonth] = useState<Date>(nextMonths);

  useEffect(() => {
    setMonth(nextMonths);
  }, []);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarDays /> {moment(month).format('MMM YYYY')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={month}
            onSelect={(value) => {
              if (value) {
                // Ensure value is not undefined
                setMonth(value);
                selectedMonth(value);
              }
            }}
            className="flex flex-1 justify-center rounded-lg"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
