'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { CloudUpload } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CreateManyHolidays } from '@/actions';

// Types
interface Holiday {
  id?: number;
  name: string;
  description: string | null;
  date: Date;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Constants
const REQUIRED_HEADERS = ['name', 'description', 'date'];
const DEFAULT_ORGANIZATION_ID = '6e6bd690-58ed-4d54-9037-893cd6cd45e8';
const dateFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' });

// Validate CSV Headers
const validateCSVHeaders = (header: string[]): boolean =>
  REQUIRED_HEADERS.every((col) => header.includes(col));

// Parse CSV Data
const parseHolidayCSV = (
  csvData: string,
  organizationId: string
): Holiday[] => {
  const parsed = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim().toLowerCase(),
    complete: (results) => {
      if (results.errors.length) {
        toast.error('Error while parsing CSV file. Check for errors.');
        console.error('Parsing errors:', results.errors);
      }
      if (!validateCSVHeaders(results.meta.fields || [])) {
        toast.error(
          'CSV file must contain the following columns: "name", "description", and "date".'
        );
      }
    },
  });

  // Map and filter data to prepare holidays
  return (
    parsed.data
      .map((holiday: any) => ({
        name: holiday.name,
        description: holiday.description || null,
        date: new Date(holiday.date),
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      // Remove duplicates based on 'name' and 'date'
      .filter(
        (holiday, index, self) =>
          index ===
          self.findIndex(
            (h) => h.name === holiday.name && h.date === holiday.date
          )
      )
  );
};

// Component
const HolidaysUploader = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const organizationId = DEFAULT_ORGANIZATION_ID; // Replace with dynamic ID if needed

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target?.result as string;
        const parsedHolidays = parseHolidayCSV(csvData, organizationId);
        if (parsedHolidays) setHolidays(parsedHolidays);
      };
      reader.readAsText(file);
    } else {
      toast.error('Please upload a valid CSV file.');
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await CreateManyHolidays(
        holidays as {
          name: string;
          description: string | null;
          date: Date;
          id: number;
          organizationId: string;
          createdAt: Date;
          updatedAt: Date;
        }[]
      );

      toast.success('Holidays successfully saved.');
      setHolidays([]); // Reset holidays after successful upload
    } catch (error) {
      toast.error('Error while saving holidays.');
      console.error('Save error:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* File Upload Section */}
        <div className="flex items-center justify-center w-full my-4">
          <label
            htmlFor="holiday-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUpload size={32} />
              <p className="text-sm font-semibold text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">CSV files only</p>
            </div>
            <input
              id="holiday-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Sample CSV Download */}
        <p className="my-3">
          Download a sample CSV file{' '}
          <Button variant="link" onClick={() => {}}>
            Download
          </Button>
        </p>

        {/* Preview Holidays Table */}
        {holidays.length > 0 && (
          <Table>
            <TableCaption>A preview list of holidays</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{holiday.name}</TableCell>
                  <TableCell>{holiday.description || 'N/A'}</TableCell>
                  <TableCell>
                    {dateFormat.format(new Date(holiday.date))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total Holidays</TableCell>
                <TableCell>{holidays.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}

        {/* Submit Button */}
        <Button type="submit" className="my-4" disabled={holidays.length === 0}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HolidaysUploader;
