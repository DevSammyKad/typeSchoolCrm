import React from 'react';
import Link from 'next/link';

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="max-w-7xl">
        <nav className="flex gap-4 h-16 text-sm  text-muted-foreground">
          <Link
            href="/dashboard/setting/"
            className="hover:text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Organization
          </Link>
          <Link
            href="/dashboard/setting/general"
            className="hover:text-blue-500 cursor-pointer hover:underline font-medium"
          >
            General
          </Link>
          <Link
            href="/dashboard/setting/integrations"
            className="hover:text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Integrations
          </Link>
          <Link
            href="/dashboard/setting/advanced"
            className="hover:text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Advanced
          </Link>
          <Link
            href="/dashboard/setting/support"
            className="hover:text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Support
          </Link>
        </nav>
        {children}
      </div>
    </>
  );
}
