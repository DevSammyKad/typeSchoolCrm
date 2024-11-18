import prisma from '@/lib/db'; // Your Prisma client instance
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'; // KindeAuth server session

import { NextResponse } from 'next/server'; // Next.js response

export async function GET() {
  const testOrganizationId = '223234'; // ID of the test organization

  try {
    // Fetch the authenticated user from the Kinde session
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Log the authenticated user details
    console.log('Authenticated User:', user);

    // If the user is not found or not authenticated, return a 401 error
    if (!user || !user.id) {
      return new NextResponse('User not found or session issue', {
        status: 401,
      });
    }

    // Check if the user already exists in the database using Kinde's user ID
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id, // Kinde user ID (String)
      },
    });

    // If the user is not found in the database, create a new user
    if (!dbUser) {
      console.log(
        'User is authenticated but not found in the database. Creating a new user.'
      );

      // Ensure that the test organization exists in the database
      const testOrganization = await prisma.organization.findUnique({
        where: {
          id: testOrganizationId, // Test organization ID
        },
      });

      // If the test organization does not exist, throw an error
      if (!testOrganization) {
        throw new Error('Test organization not found in the database');
      }

      // Create the new user and associate with the test organization
      dbUser = await prisma.user.create({
        data: {
          id: user.id, // Use Kinde user ID for user identification
          firstName: user.given_name ?? '', // Use Kinde's `given_name`
          lastName: user.family_name ?? '', // Use Kinde's `family_name`
          profileImage: user.picture ?? '', // Use profile image from Kinde
          email: user.email ?? '', // Use email from Kinde
          organizationId: testOrganizationId, // Associate with the test organization
        },
      });

      console.log('Created new user in the test organization:', dbUser);
      return NextResponse.redirect(
        new URL(
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/dashboard'
            : 'nexus.com'
        )
      );
    } else {
      console.log('User already exists in the database:', dbUser);
      return NextResponse.redirect(
        new URL(
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/dashboard'
            : 'nexus.com'
        )
      );
    }

    // Return the user data as a JSON response
    return NextResponse.json({ user: dbUser });
  } catch (error) {
    console.error('Error during GET request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
