// import { getOrganizationDetails } from '@/actions';
import prisma from '@/lib/db';
import EditOrganization from './_components/EditOrganization';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

interface iAppsProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subdomain: string;
  organizationName: string;
  organizationPanCard: string;
  organizationMail: string;
  organizationType: string;
  organizationWebsite: string | null;
  isActive: string | null;
}

export default async function SettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    redirect('/api/auth/login');
  }

  const userOrg = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    include: {
      organization: true,
    },
  });

  const organization = await prisma.organization.findUnique({
    where: {
      id: userOrg?.organization.id,
    },
  });
  if (!organization) {
    throw new Error('Organization Not found');
  }

  // Remove console.log to avoid unnecessary renders
  console.log(organization);

  return (
    <div>
      <EditOrganization data={organization} />
    </div>
  );
}
