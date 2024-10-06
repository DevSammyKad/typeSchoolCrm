import prisma from '@/lib/db';

async function main() {
  const organization = await prisma.organization.create({
    data: {
      subdomain: 'default-org',
      organizationName: 'Default Organization',
      organizationPanCard: 'ABCDE1234F',
      organizationMail: 'default@organization.com',
      organizationType: 'Educational',
      organizationWebsite: 'http://default.org',
    },
  });
  console.log('Organization created:', organization);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
