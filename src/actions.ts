'use server';
import { parseWithZod } from '@conform-to/zod';
import { organizationSchema } from '@/lib/zodSchemas';
import prisma from './lib/db';
import { redirect } from 'next/navigation';
import { Holiday } from '@prisma/client';

export async function createOrganization(
  prevState: unknown,
  formData: FormData
) {
  console.log('createOrganization called');
  console.log('Form data:', Object.fromEntries(formData.entries()));
  const submission = parseWithZod(formData, {
    schema: organizationSchema,
  });
  if (submission.status !== 'success') {
    console.log('Validation failed:', submission.error);
    return submission.reply();
  }

  console.log('Organization creation data:', submission.value);
  await prisma.organization.create({
    data: {
      organizationName: submission.value.organizationName,
      organizationPanCard: submission.value.organizationPanCard,
      organizationMail: submission.value.organizationMail,
      organizationType: submission.value.organizationType,
      organizationWebsite: submission.value.organizationWebsite || '',
      subdomain: submission.value.subdomain,
    },
  });
  console.log('orgCreated', formData);
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
  console.log('Received organizationId:', organizationId);

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

// export async function getOrganizationDetails() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   if (!user) {
//     redirect('/api/auth/login');
//   }
//   const userData = await prisma.user.findUnique({
//     where: { email: user.email ?? undefined },
//   });
//   if (!userData || !userData.organizationId) {
//     throw new Error('Organization ID not found for the user');
//   }
//   const organization = await prisma.organization.findUnique({
//     where: { id: userData.organizationId },
//   });
//   if (!organization) {
//     throw new Error('Organization Not found');
//   }

//   // Remove console.log to avoid unnecessary renders
//   // console.log(organization);

//   // Move revalidatePath before returning the organization

//   return organization;
// }

export async function getFees() {
  const fees = await prisma.fee.findMany({
    include: {
      student: true,
      feecategory: true,
    },
  });
  return fees;
}

// Student Attendance

// Get Grades

export async function getGrades() {
  const grades = await prisma.grade.findMany();

  return grades;
}

export async function CreateManyHolidays(holidays: Holiday[]) {
  const organizationId = '6e6bd690-58ed-4d54-9037-893cd6cd45e8';

  // Check Duplicates For this organization
  const existingHolidays = await prisma.holiday.findMany({
    where: {
      organizationId,
      OR: holidays.map((holiday) => ({
        name: holiday.name,
        date: new Date(holiday.date),
      })),
    },
  });
  // Filter out Duplicates Based on Name and Date

  const existingHolidayNames = new Set(
    existingHolidays.map(
      (holiday) => `${holiday.name}-${holiday.date.toISOString()}`
    )
  );

  const uniqueHolidays = holidays.filter((holiday) => {
    const holidayKey = `${holiday.name}-${new Date(
      holiday.date
    ).toISOString()}`;
    return !existingHolidayNames.has(holidayKey);
  });

  if (uniqueHolidays.length > 0) {
    const submission = await prisma.holiday.createMany({
      data: uniqueHolidays.map((holiday) => ({
        ...holiday,
        organizationId,
        date: new Date(holiday.date),
      })),
    });
    return submission;
  }
  return { message: 'No new holidays to add are duplicates' };
}

export async function deleteHoliday(id: number) {
  try {
    await prisma.holiday.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting holiday:', error);
    return { success: false, error: 'Error deleting holiday' };
  }
}
