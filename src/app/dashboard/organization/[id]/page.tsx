import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import EditOrganization from '../../setting/_components/EditOrganization';
import { Suspense } from 'react';

async function getData(organizationId: string) {
  const data = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}
export default async function EditOrganizationRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrganization data={data} />
      </Suspense>
    </div>
  );
}
