import { Metadata } from 'next';

import { DataTable } from '@/app/components/dashboard/data-table-components/data-table';
import { columns } from '@/app/components/dashboard/data-table-components/columns';
import prisma from '@/types';

export const dynamic = 'force-dynamic'; // Ensures dynamic rendering

export const metadata: Metadata = {
  title: 'Lead Page',
  description: 'Lead page for school.',
};

async function getData() {
  const data = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export default async function Page() {
  const data = await getData();
  return <DataTable data={data} columns={columns} />;
}
