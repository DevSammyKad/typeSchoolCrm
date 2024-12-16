'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LeadSource, LeadStatus } from '../data-table-components/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { useState, useTransition } from 'react';
import { DataTableViewOptions } from './data-table-view-options';
import { TrashIcon, X } from 'lucide-react';
import { CalendarDatePicker } from '@/components/ui/calendar-date-picker';
import AddLeadForm from '../AddLeadForm';
import { toast } from 'sonner';
import { deleteLeadMany } from '@/actions';
import { Lead } from './columns';
import { useRouter } from 'next/navigation';

interface DataTableToolbarProps {
  table: Table<Lead>;
}

export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    if (!from || !to) return;

    setDateRange({ from, to });

    const formattedFrom = from.toISOString(); // Ensure ISO format
    const formattedTo = to.toISOString();

    // Apply the date range filter
    table.getColumn('createdAt')?.setFilterValue([formattedFrom, formattedTo]);
  };

  console.log('Table Filters:', table.getState().columnFilters);
  console.log('Date Range Selected:', dateRange);

  const handleBatchDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const leadIds = selectedRows.map((row) => row.original.id);

    if (leadIds.length === 0) {
      toast.error('No leads selected for deletion');
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteLeadMany(leadIds);
        if (result.success) {
          router.push('/dashboard/leads');
          toast.success(`Successfully deleted ${result.count} lead(s)`);
          table.resetRowSelection(); // Reset selection after deletion
          // Optionally refresh data if needed
        } else {
          toast.error(result.error || 'Failed to delete leads');
        }
      } catch (error) {
        console.error('Error during batch deletion:', error);
        toast.error('An error occurred while deleting leads');
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search Phone Number ..."
          value={
            (table.getColumn('leadPhoneNumber')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) => {
            const value = event.target.value.trim();
            table
              .getColumn('leadPhoneNumber')
              ?.setFilterValue(value || undefined); // Use undefined to clear filter
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn('leadSource') && (
          <DataTableFacetedFilter
            column={table.getColumn('leadSource')}
            title="LeadSource"
            options={LeadSource}
          />
        )}
        {table.getColumn('leadStatus') && (
          <DataTableFacetedFilter
            column={table.getColumn('leadStatus')}
            title="LeadStatus"
            options={LeadStatus}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters(); // Reset all filters
              setDateRange({
                from: new Date(new Date().getFullYear(), 0, 1),
                to: new Date(),
              }); // Reset date picker
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleBatchDelete}
            disabled={isPending}
          >
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <AddLeadForm />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
