'use server';
import prisma from '@/lib/db';

export const readSubdomain = async (subdomain: string) => {
  try {
    // Fetch the organization data based on the subdomain (case-insensitive)
    const organization = await prisma.organization.findUnique({
      where: {
        subdomain: 'rsai',
      },
      select: {
        id: true,
        organizationName: true,
        organizationPanCard: true,
        createdAt: true,
        updatedAt: true,
        subdomain: true,
      },
    });

    // If no organization is found, return null
    if (!organization) {
      console.warn(`No organization found for subdomain: ${subdomain}`);
      return null;
    }

    return organization;
  } catch (error) {
    console.error('Error fetching subdomain data:', error);
    throw new Error('Failed to retrieve subdomain data'); // Propagate the error
  }
};
