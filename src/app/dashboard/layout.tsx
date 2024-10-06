import React from 'react';
import SideNav from './components/SideNav';
import Header from './components/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full">
      <div className="hidden h-screen md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <SideNav />
      </div>
      <div className="flex flex-grow flex-col">
        <main className="flex-grow md:pl-72">
          <Header />
          <div className="p-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
