'use server';
import { parseWithZod } from '@conform-to/zod';
import {
  gradeSchema,
  leadSchema,
  organizationSchema,
  sectionSchema,
  studentSchema,
} from '@/lib/zodSchemas';
import prisma from './lib/db';
import { redirect } from 'next/navigation';
import { Gender, Holiday } from '@prisma/client';

// Organization
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

// Student Fees
export async function getFees() {
  const fees = await prisma.fee.findMany({
    include: {
      student: true,
      feecategory: true,
    },
  });
  return fees;
}
// Student Page
export async function createStudent(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: studentSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const selectedGrade = formData.get('selectedGrade') as string;
  const selectedSection = formData.get('selectedSection') as string;

  await prisma.student.create({
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      email: submission.value.email,
      phoneNumber: submission.value.phoneNumber,
      address: submission.value.address,
      parentContact: submission.value.parentContact,
      sectionId: selectedSection,
      gradeId: selectedGrade,
      age: submission.value.age,
      gender: submission.value.gender as Gender | null,
      profileImage: submission.value.profileImage,
      organizationId: submission.value.organizationId,
    },
  });
  redirect('/dashboard/students');
}

// Student Attendance

// Get Grades
export async function getGrades() {
  const grades = await prisma.grade.findMany();

  return grades;
}

// Lead Page
export async function createLead(prevState: any, formData: FormData) {
  const organizationId = '212b7959-4a3a-43dc-8a53-7607e0ee2d17';

  // console.log(
  //   'FormData received in createLead:',
  //   Object.fromEntries(formData.entries())
  // );

  const submission = parseWithZod(formData, {
    schema: leadSchema,
  });

  // console.log('Parsed Submission:', submission);

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.lead.create({
    data: {
      leadName: submission.value.leadName,
      leadEmail: submission.value.leadEmail,
      leadPhoneNumber: submission.value.leadPhoneNumber,
      leadSource: submission.value.leadSource,
      leadAge: submission.value.leadAge,
      leadStatus: submission.value.leadStatus,
      note: submission.value.note || '',
      organizationId: organizationId,
    },
  });

  // console.log('Database Insert Result:', result); // Debug DB Insertion Result

  redirect('/dashboard');
}

export async function editLead(prevState: any, formData: FormData) {
  const organizationId = '212b7959-4a3a-43dc-8a53-7607e0ee2d17';

  const submission = parseWithZod(formData, {
    schema: leadSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  console.log('Received formData:', Array.from(formData.entries()));

  const leadId = formData.get('leadId') as string;

  if (!leadId) {
    throw new Error('leadId is missing in formData');
  }

  console.log('Updating Lead with ID:', leadId);
  // Update the lead in the database
  const result = await prisma.lead.update({
    where: {
      id: leadId,
    },
    data: {
      leadName: submission.value.leadName,
      leadEmail: submission.value.leadEmail,
      leadPhoneNumber: submission.value.leadPhoneNumber,
      leadSource: submission.value.leadSource,
      leadAge: submission.value.leadAge,
      leadStatus: submission.value.leadStatus,
      note: submission.value.note || '',
      organizationId,
    },
  });

  console.log('Lead successfully updated:', result);

  // Redirect to the leads dashboard after updating
  redirect('/dashboard/leads');
}

export async function deleteLeadById(leadId: string) {
  try {
    const result = await prisma.lead.delete({
      where: { id: leadId },
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error deleting row:', error);
    return { success: false, error: 'Error while deleting' };
  }
}

export async function deleteLeadMany(leadIds: string[]) {
  // const organizationId = '212b7959-4a3a-43dc-8a53-7607e0ee2d17';
  try {
    const result = await prisma.lead.deleteMany({
      where: { id: { in: leadIds } },
    });

    return { success: true, count: result.count };
  } catch (error) {
    console.error('Error deleting selected leads:', error);
    return { success: false, error: 'Failed to delete selected leads' };
  }
}

// Add Grade
export async function createGrade(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: gradeSchema,
  });
  if (submission.status !== 'success') {
    console.log('Validation failed:', submission.error);
    return submission.reply();
  }

  console.log('Grade creation data:', submission.value);
  await prisma.grade.create({
    data: {
      grade: submission.value.grade,
      organizationId: '212b7959-4a3a-43dc-8a53-7607e0ee2d17',
    },
  });

  redirect('/dashboard/grades');
}
export async function deleteGrade(formData: FormData) {
  const gradeIdValue = formData.get('gradeId')?.toString();

  await prisma.grade.delete({
    where: { id: gradeIdValue },
  });

  redirect('/dashboard/grades');
}

export async function deleteSection(formData: FormData) {
  const sectionId = formData.get('sectionId')?.toString();

  await prisma.section.delete({
    where: { id: sectionId },
  });

  redirect('/dashboard/grades');
}

export async function createSection(prevState: any, formData: FormData) {
  const gradeId = formData.get('gradeId');
  const submission = parseWithZod(formData, {
    schema: sectionSchema,
  });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.section.create({
    data: {
      name: submission.value.name,
      gradeId: submission.value.gradeId,
      organizationId: '212b7959-4a3a-43dc-8a53-7607e0ee2d17',
    },
  });

  redirect(`/dashboard/grades/${gradeId}`);
}

// Teacher Page Action

//###############  Organization Setting Action ##### ////

// organization Holidays
export async function CreateManyHolidays(holidays: Holiday[]) {
  const organizationId = '212b7959-4a3a-43dc-8a53-7607e0ee2d17';

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
