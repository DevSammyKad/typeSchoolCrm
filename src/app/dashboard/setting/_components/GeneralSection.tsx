import prisma from '@/lib/db';

const orgId = '6e6bd690-58ed-4d54-9037-893cd6cd45e8'; // Organization ID

const GeneralSection = async () => {
  // Fetch all users belonging to the organization
  const users = await prisma.user.findMany({
    where: {
      organizationId: orgId, // Organization ID
    },
    include: {
      organization: true, // Include organization relation to access the organizationName
    },
  });

  return (
    <div className="flex w-full">
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName} -{' '}
          {user.organization.organizationName}
        </div>
      ))}
    </div>
  );
};

export default GeneralSection;
