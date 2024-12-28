import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'School CRM',
  description: 'Entire School Management Software',
  keywords:
    'Sameer Kad, School CRM, Full-Stack Developer, School Management Software, Educational CRM, Attendance Tracker, Fee Management, Next.js Developer',
  metadataBase: new URL('https://school-crm.example.com'),
  authors: [{ name: 'Sameer Kad', url: 'https://github.com/DevSammyKad' }],
  creator: 'Sameer Kad',
  applicationName: 'School CRM',
  publisher: 'Sameer Kad',
  // openGraph: {
  //   title: 'Sameer Kad | School CRM',
  //   description:
  //     'Explore School CRM, a powerful school management tool developed by Sameer Kad. Simplify educational administration with role-based access, fee management, and attendance tracking.',
  //   url: 'https://school-crm.example.com',
  //   siteName: 'School CRM',
  //   type: 'website',
  //   images: [
  //     {
  //       url: '/og-image.png', // Replace with your Open Graph image URL
  //       width: 1200,
  //       height: 630,
  //       alt: 'Sameer Kad | School CRM',
  //     },
  //   ],
  // },
};
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
