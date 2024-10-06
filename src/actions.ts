'use server';
import { parseWithZod } from '@conform-to/zod';
import { organizationSchema } from '@/lib/zodSchemas';
import prisma from './lib/db';
import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export async function getKindeUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/login');
  }
  return user;
}

export async function createOrganization(
  prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: organizationSchema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }
  await prisma.organization.create({
    data: {
      organizationName: submission.value.organizationName,
      organizationPanCard: submission.value.organizationPanCard,
      organizationMail: submission.value.organizationMail,
      organizationType: submission.value.organizationType,
      organizationWebsite: submission.value.organizationWebsite,
      subdomain: submission.value.subdomain,
    },
  });
  redirect('/dashboard');
}

export async function editOrganization(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: organizationSchema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const organizationId = formData.get('organizationId') as string;

  if (!organizationId) {
    throw new Error('Organization ID is required');
  }

  // Check if the organization exists
  const existingOrganization = await prisma.organization.findUnique({
    where: { id: organizationId },
  });

  if (!existingOrganization) {
    throw new Error('Organization not found');
  }

  await prisma.organization.update({
    where: {
      id: organizationId,
    },
    data: {
      organizationName: submission.value.organizationName,
      organizationPanCard: submission.value.organizationPanCard,
      organizationMail: submission.value.organizationMail,
      organizationType: submission.value.organizationType,
      organizationWebsite: submission.value.organizationWebsite,
      subdomain: submission.value.subdomain,
    },
  });
  redirect('/dashboard');
}

export async function getOrganizationDetails() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/login');
  }
  const userData = await prisma.user.findUnique({
    where: { email: user.email ?? undefined },
  });
  if (!userData || !userData.organizationId) {
    throw new Error('Organization ID not found for the user');
  }
  const organization = await prisma.organization.findUnique({
    where: { id: userData.organizationId },
  });
  if (!organization) {
    throw new Error('Organization Not found');
  }

  // Remove console.log to avoid unnecessary renders
  // console.log(organization);

  // Move revalidatePath before returning the organization

  return organization;
}
