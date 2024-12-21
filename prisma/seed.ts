import { PrismaClient } from '@prisma/client';
import { faker, simpleFaker } from '@faker-js/faker';

const prisma = new PrismaClient();
const testOrganizationId = '212b7959-4a3a-43dc-8a53-7607e0ee2d17';

async function main() {
  // await prisma.lead.deleteMany({
  //   where: { organizationId: testOrganizationId },
  // });
  // // Seed leads
  // const leads = Array.from({ length: 10 }).map(() => ({
  //   id: simpleFaker.string.uuid(),
  //   leadName: faker.person.fullName(),
  //   leadEmail: faker.internet.email(),
  //   leadPhoneNumber: faker.phone.number({ style: 'national' }),
  //   leadStatus: faker.helpers.arrayElement([
  //     'NEW',
  //     'CONTACTED',

  //     'FOLLOW_UP',
  //     'MISSED',
  //     'CLOSED',
  //   ]),
  //   leadAge: faker.number.int({ min: 18, max: 60 }),
  //   leadSource: faker.helpers.arrayElement([
  //     'FACEBOOK',
  //     'GOOGLE_ADS',
  //     'LINKEDIN',
  //     'TWITTER',
  //     'INSTAGRAM',
  //     'REFERRAL',
  //     'WEBSITE',
  //     'EMAIL_CAMPAIGN',
  //     'EVENTS',
  //     'COLD_CALL',
  //   ]),
  //   organizationId: testOrganizationId,
  //   note: faker.book.title(),
  //   createdAt: faker.date.anytime(),
  // }));

  // // Add leads to the database
  // await prisma.lead.createMany({
  //   data: leads,
  // });
  // console.log('Leads Added Successfully');

  await prisma.grade.deleteMany({
    where: { organizationId: testOrganizationId },
  });
  // const grades = Array.from({ length: 5 }).map((_, index) => ({
  //   organizationId: testOrganizationId,
  //   grade: `${index + 1}th grade`,
  // }));

  // for (const grade of grades) {
  //   await prisma.grade.create({ data: grade });
  // }
  // console.log('Grades Added Successfully');

  // const students = Array.from({ length: 100 }).map(() => ({
  //   organizationId: testOrganizationId,
  //   age: faker.number.int({ min: 18, max: 60 }),
  //   firstName: faker.person.firstName(),
  //   lastName: faker.person.lastName(),
  //   address: faker.book.title(),
  //   phoneNumber: faker.phone.number({ style: 'national' }),
  //   gradeId: 62,
  //   profileImage: faker.image.avatar(),
  // }));

  // await prisma.student.createMany({
  //   data: students,
  // });

  // console.log('Student Added Successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
