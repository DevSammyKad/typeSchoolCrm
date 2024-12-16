'use client';

import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { useTransition } from 'react';
import { deleteLeadById } from '@/actions';
import { toast } from 'sonner';
import { Lead } from './columns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps {
  row: Row<Lead>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const leadId = row.original.id;

  const handleDelete = async () => {
    // Assuming `id` is the unique key for the row
    startTransition(async () => {
      try {
        const result = await deleteLeadById(leadId.toString());
        if (result.success) {
          toast.success('Lead deleted successfully');
          router.push('/dashboard/leads');
          // Optionally, you can refresh the table data here
        } else {
          toast.error(`Failed to delete Lead: ${result.error}`);
        }
      } catch (error) {
        console.error('Error deleting Lead:', error);
        toast.error('An error occurred while deleting the Lead');
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link href={`/dashboard/leads/${leadId}`}>Edit</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleDelete} disabled={isPending}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
