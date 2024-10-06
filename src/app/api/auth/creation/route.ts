import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const testOrganizationId = '4435b4e6-4626-483d-b808-e6d8cf31edc6';
  try {
    // Fetching the authenticated user from the session
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log('Authenticated User:', user);

    // If no user is found, return an error
    if (!user || !user.id) {
      throw new Error('User not found or session issue');
    }

    // Checking if the user exists in the database
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    // If the user doesn't exist in the database, create a new user entry
    if (!dbUser) {
      // Look for a default organization if necessary
      const defaultOrganization = await prisma.organization.findUnique({
        where: {
          id: testOrganizationId,
        },
      });
      if (!defaultOrganization) {
        throw new Error('No default organization found');
      }

      // Create a new user record with default organization
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? '',
          lastName: user.family_name ?? '',
          profileImage: user.picture ?? '',
          email: user.email ?? '',
          organizationId: defaultOrganization.id,
        },
      });

      console.log('Created new user:', dbUser);
    }

    // TODO Check if the user belongs to multiple organizations

    // const userOrganizations = await prisma.organization.findMany({
    //   where: {
    //     id: user.id,
    //   },
    // });
    // if (userOrganizations.length > 1) {
    //   return NextResponse.redirect(new URL('/select-organization', '/'));
    // }

    // Redirect the user to the dashboard after successful creation or lookup
    return NextResponse.redirect(
      new URL('/dashboard', 'http://localhost:3000')
    );
  } catch (error) {
    console.error('Error during GET request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
