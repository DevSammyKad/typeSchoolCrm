Student Registration -
Leads Sheet

# Schema

// schema.prisma

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

generator client {
provider = "prisma-client-js"
}

model Admin {
id Int @id @default(autoincrement())
email String @unique
password String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model Student {
id Int @id @default(autoincrement())
email String @unique
password String
firstName String
lastName String
enrollmentStatus String
courseHistories CourseHistory[]
progressReports ProgressReport[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model Teacher {
id Int @id @default(autoincrement())
email String @unique
password String
firstName String
lastName String
expertise String
qualifications String
scheduleAvailability String
courses Course[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model Course {
id Int @id @default(autoincrement())
title String
syllabus String
schedule String
prerequisites String
pricing Float
teacherId Int
teacher Teacher @relation(fields: [teacherId], references: [id])
enrollments Enrollment[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model Enrollment {
id Int @id @default(autoincrement())
studentId Int
courseId Int
student Student @relation(fields: [studentId], references: [id])
course Course @relation(fields: [courseId], references: [id])
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model CourseHistory {
id Int @id @default(autoincrement())
studentId Int
courseId Int
student Student @relation(fields: [studentId], references: [id])
course Course @relation(fields: [courseId], references: [id])
createdAt DateTime @default(now())
}

model ProgressReport {
id Int @id @default(autoincrement())
studentId Int
courseId Int
student Student @relation(fields: [studentId], references: [id])
course Course @relation(fields: [courseId], references: [id])
progress String
completionRate Int
createdAt DateTime @default(now())
}

model Lead {
id Int @id @default(autoincrement())
email String @unique
contactInfo String
interests String
stage String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model Subscription {
id Int @id @default(autoincrement())
userId Int
tier String
startDate DateTime
endDate DateTime
user User @relation(fields: [userId], references: [id])
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model User {
id Int @id @default(autoincrement())
email String @unique
role Role
student Student?
teacher Teacher?
admin Admin?
subscription Subscription?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

enum Role {
ADMIN
TEACHER
STUDENT
}

# Also we can add

-- Potential future expansion:
-- 1. Add more detailed information for users, teachers, and students
-- 2. Introduce courses, classes, and assignments tables
-- 3. Implement a messaging system for communication between Parents and Teachers
-- 4. Track performance metrics for teachers and students
-- 5. Incorporate a payment system for tuition fees

# Students Section AutoMate Report send by Whatsapp API

# -- Send Today's attendance status to Parent

Dear [Parent Name],

This is a daily attendance report for your child, [Student Name].

- **Date:** [Date]
- **Present:** [Present (Yes/No)]
- **Absent Reason (if applicable):** [Reason for Absence (optional)]

**Regards,**

[School Name]

# -- Send Monthly attendance Report to Parent

Dear [Parent Name],

This is a monthly attendance report for your child, [Student Name], for [Month Name] [Year].

- **Total Days:** [Number of School Days in the Month]
- **Present:** [Number of Days Present]
- **Absent:** [Number of Days Absent]
- **Attendance Percentage:** [Attendance Percentage (calculated)]

**Details:**

- You can access the detailed attendance breakdown on our school portal: [Link to School Portal (optional)]

**Regards,**

[School Name]

# Problems

-- How we can create API_Key for our API
Purpose => I want to create SECRET_API_KEY for Pabbly connect app as Trigger Event -
Flow => Facebook Lead's Pabbly trigger => My pabbly Connect App as event => when user put SECRET_API_KEY in pabbly then send all Facebook leads to SECRET_API_KEY with assign with perticular user

# Current Stack Overview:

Your current stack already covers many essential aspects of modern web application development. Here’s a breakdown of what you have and some additional suggestions based on your requirements:

Next.js: For server-side rendering, static site generation, and overall React framework.
Tailwind CSS: For utility-first CSS and rapid UI development.
Supabase: For backend services, including authentication, real-time databases, and more.
Prisma: For ORM and database management.
ShadCN: For UI components (if this is correct, though it might be a typo for something else).
Additional Recommendations:
Based on your existing stack and the goal of building a robust multi-tenant SaaS application, here are some other tools and technologies you might consider integrating:

Authentication and Authorization:
Supabase Auth: Since you're using Supabase, their authentication system should be sufficient for handling user logins, registration, and roles.
NextAuth.js: If you need more customization or additional providers.
API Layer:
API Routes in Next.js: Utilize Next.js API routes for building your backend logic. You’re likely already doing this.
Form Handling:
React Hook Form: For managing forms and validations smoothly.
Zod : For schema validation, especially when integrated with React Hook Form.
State Management:
React Context: For global state management if your app is not too complex.
Zustand or Recoil: For more advanced state management requirements.
Caching and Data Fetching:
React Query (TanStack Query): For server-state management and caching.
SWR (stale-while-revalidate): For data fetching.
Analytics and Monitoring:
LogRocket or Sentry: For error tracking and performance monitoring.
Google Analytics: For tracking user interactions and behaviors.
Deployment and CI/CD:
Vercel: Since you are using Next.js, Vercel offers seamless integration and deployment.
GitHub Actions: For CI/CD pipelines.
Testing:
Jest and React Testing Library: For unit and integration testing.
Cypress: For end-to-end testing.
Documentation and API Management:
Swagger or Postman: For API documentation and testing.
Storybook: For documenting UI components.
Additional Considerations:
GraphQL: If you find that your data requirements are complex and you need more flexibility, consider using GraphQL with Apollo Server and Client.
WebSockets: For real-time functionalities, Supabase also provides real-time capabilities, but you can use libraries like socket.io if you need more control.

# <!-- I want Add to become more scalable  -->

Redis
redux
multi tanancy
upstash redis

# <!-- Double Check-->

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export default withAuth(
async function middleware(req: NextRequest) {
const url = req.nextUrl;
let hostname = req.headers.get('host') || '';

    // Remove port if it exists
    hostname = hostname.split(':')[0];

    // Define allowed domains (including main domain and localhost)
    const allowedDomains = ['nexus.com', 'www.nexus.com', 'localhost'];

    // Check if the current hostname is in the list of allowed domains
    const isMainDomain = allowedDomains.includes(hostname);

    // Extract subdomain if not a main domain
    const subdomain = isMainDomain ? null : hostname.split('.')[0];

    console.log('Middleware: Hostname:', hostname);
    console.log('Middleware: Subdomain:', subdomain);

    // If it's a main domain, allow the request to proceed
    if (isMainDomain) {
      console.log('Middleware: Main domain detected, passing through');
      return NextResponse.next();
    }

    // Handle subdomain logic
    if (subdomain) {
      try {
        // Use fetch to verify if the subdomain exists
        const response = await fetch(
          `${url.origin}/api/subdomain?subdomain=${subdomain}`
        );

        if (response.ok) {
          console.log('Middleware: Valid subdomain detected, rewriting URL');
          // Rewrite the URL to a dynamic route based on the subdomain
          return NextResponse.rewrite(
            new URL(`/${subdomain}${url.pathname}`, req.url)
          );
        }
      } catch (error) {
        console.error('Middleware: Error fetching tenant:', error);
      }
    }

    console.log('Middleware: Invalid subdomain or domain, returning 404');
    // If none of the above conditions are met, return a 404 response
    return new NextResponse(null, { status: 404 });

},
{
isReturnToCurrentPage: true,
loginPage: '/api/auth/login',
}
);

export const config = {
matcher: ['/dashboard'],
};

# Important Links

https://preline.co/pro/examples/tables-orders.html

https://preline.co/pro/examples/forms-add-create.html
