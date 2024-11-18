import { Prisma, PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  // const organization = await prisma.organization.create({
  //   data: {
  //     subdomain: 'default-org',
  //     organizationName: 'Default Organization',
  //     organizationPanCard: 'ABCDE1234F',
  //     organizationMail: 'default@organization.com',
  //     organizationType: 'Educational',
  //     organizationWebsite: 'https://default.org',
  //   },
  // });
  // console.log('Organization created: Seeding Finished', organization);
  // const user = await prisma.user.create({
  //   data: {
  //     email: 'sameerkad2001@gmail.com',
  //     firstName: 'Sameer',
  //     lastName: 'Kad',
  //     profileImage: 'https://avatars.githubusercontent.com/u/101364763?v=4',
  //     role: 'ADMIN',
  //     organizationId: '6e6bd690-58ed-4d54-9037-893cd6cd45e8',
  //   },
  // });

  // const grade = await prisma.grade.create({
  //   data: {
  //     grade: 'B',
  //     organizationId: '6e6bd690-58ed-4d54-9037-893cd6cd45e8',
  //   },
  // });
  const student = await prisma.student.create({
    data: {
      age: 20,
      firstName: 'name 2',
      lastName: 'name 2',
      profileImage: 'https://avatars.githubusercontent.com/u/101364763?v=4',
      address: "'123 Main St'",
      phoneNumber: '+91-1234567890',
      gradeId: 1,
      organizationId: '6e6bd690-58ed-4d54-9037-893cd6cd45e8',
    },
  });

  const feeCategory = await prisma.feeCategory.create({
    data: {
      name: 'Yearly Fee',
      description: 'This is the yearly fee',
    },
  });

  const fee = await prisma.fee.create({
    data: {
      totalFee: 1000,
      paidAmount: 10,
      dueDate: new Date(),
      status: 'UNPAID',
      studentId: 'd330c7cf-f6df-402d-afee-38e27fd7d881',
      categoryId: 'cm2a4odgk0000eeichr15khu3',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
