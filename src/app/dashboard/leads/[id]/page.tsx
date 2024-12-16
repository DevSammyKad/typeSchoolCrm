import EditLeadForm from '@/app/components/dashboard/EditLeadForm';
import prisma from '@/lib/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Lead Page',
  description: 'Lead page for school.',
};

async function getData(leadId: string) {
  const data = await prisma.lead.findUnique({
    where: {
      id: leadId,
    },
  });
  return data;
}

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <EditLeadForm data={data} />
    </div>
  );
};

export default page;
