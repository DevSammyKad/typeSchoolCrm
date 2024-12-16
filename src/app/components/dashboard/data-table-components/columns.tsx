'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { leadSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import { LeadSource, LeadStatus } from '@prisma/client';

export type Lead = {
  id: string;
  note: string | null;
  leadName: string;
  leadEmail: string;
  leadPhoneNumber: string;
  leadSource: LeadSource;
  leadStatus: LeadStatus;
  leadAge: number | null;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
};

export const columns: ColumnDef<Lead>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'leadName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LeadName" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue('leadName')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'leadSource',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Source" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue('leadSource')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'leadStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('leadStatus') as string;
      return (
        <div className="flex w-[100px] items-center">
          <span
            className={`${
              status === 'NEW'
                ? 'rounded-lg bg-green-50 px-4 py-2 text-green-500 dark:bg-green-100/25 dark:text-green-200'
                : ''
            } ${
              status === 'CONTACTED'
                ? 'rounded-lg bg-blue-50 px-4 py-2 text-blue-500 dark:bg-blue-100/25 dark:text-blue-200'
                : ''
            } ${
              status === 'FOLLOW_UP'
                ? 'rounded-lg bg-yellow-50 px-4 py-2 text-yellow-500 dark:bg-yellow-100/25 dark:text-yellow-200'
                : ''
            } ${
              status === 'CONVERTED'
                ? 'rounded-lg bg-green-50 px-4 py-2 text-green-500 dark:bg-green-100/25 dark:text-green-200'
                : ''
            } ${
              status === 'CLOSED'
                ? 'rounded-lg bg-indigo-50 px-4 py-2 text-indigo-500 dark:bg-indigo-100/25 dark:text-indigo-200'
                : ''
            } ${
              status === 'MISSED'
                ? 'rounded-lg bg-red-50 px-4 py-2 text-red-500 dark:bg-red-100/25 dark:text-red-200'
                : ''
            } `}
          >
            {status}
          </span>
          {/* <span className="capitalize">{status.toLowerCase()}</span> */}
          {/* <span className="capitalize"> {row.getValue('status')}</span> */}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'leadAge',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px] capitalize">{row.getValue('leadAge')}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'leadPhoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">
        {row.getValue('leadPhoneNumber')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'leadEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] capitalize">{row.getValue('leadEmail')}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },

  // {
  //   accessorKey: 'amount',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Amount" />
  //   ),
  //   cell: ({ row }) => {
  //     const type = row.getValue('type');
  //     return (
  //       <div className="flex w-[100px] items-center">
  //         <span
  //           className={cn(
  //             'capitalize',
  //             type === 'income' ? 'text-green-500' : 'text-red-500'
  //           )}
  //         >
  //           {' '}
  //           {row.getValue('amount')}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: 'note',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue('note')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      // const date = new Date(row.getValue('date'));
      const formattedDate = new Intl.DateTimeFormat('en-IN').format(
        row.getValue('createdAt')
      );
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value.map((date: string) => new Date(date));
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
