'use client';

import Image from 'next/image';
import next from '@/images/next.svg';
import React, { useEffect, useState } from 'react';
import { NavLinks } from '@/constants/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getUserRole } from '@/lib/getUserRole';

const SideNav = ({ closeSidebar }: { closeSidebar?: () => void }) => {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null); // Store user role
  const [filteredLinks, setFilteredLinks] = useState(NavLinks); // Store filtered links

  // Fetch the user role when the component mounts
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userId = 'kp_0662129faa694884bbe855c37a5594fe'; // Replace with actual user ID
        const userRole = await getUserRole(userId);
        setRole(userRole || 'ADMIN'); // Set the user's role
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  // Filter the navigation links based on the user's role
  useEffect(() => {
    if (role) {
      const filtered = NavLinks.filter((link) => link.roles.includes(role));
      setFilteredLinks(filtered); // Update the filtered links based on the role
    }
  }, [role]);

  const handleLinkClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className="w-72 shadow-sm relative flex h-full flex-col justify-between p-4">
      <div className="flex items-center justify-between h-16">
        <Image
          src={next}
          width={190}
          height={100}
          quality={75}
          alt="Logo"
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="px-1 text-sm font-medium max-lg:text-xs max-md:px-1">
          Main menu
        </h2>

        {/* Render filtered navigation links based on role */}
        {filteredLinks.slice(0, -2).map((item, index) => (
          <Link key={index} href={item.path} onClick={handleLinkClick}>
            <div
              className={`max-md:px-1 max-md:mx-0 max-md:py-2 max-md:text-sm my-5 flex justify-start rounded-lg px-4 py-3 text-start text-lg font-medium ${
                pathname === item.path
                  ? 'bg-zinc-200 text-[#4EFFCA] dark:bg-zinc-900 border-l-8 border-[#4EFFCA] overflow-hidden'
                  : ''
              }`}
            >
              <div className="flex items-center justify-center space-x-5">
                {item.icon && (
                  <item.icon className="flex h-6 w-6 items-center justify-center" />
                )}
                <div className="text-sm">{item.heading}</div>
              </div>
            </div>
          </Link>
        ))}

        <h2 className="px-1 text-sm font-medium max-lg:text-xs max-md:px-1">
          Setting
        </h2>

        {/* Render filtered settings links */}
        {filteredLinks.slice(-2).map((item, index) => (
          <Link key={index} href={item.path} onClick={handleLinkClick}>
            <div
              className={`max-md:px-1 max-md:mx-0 max-md:py-2 max-md:text-sm my-5 flex justify-start rounded-lg px-4 py-3 text-start text-lg font-medium ${
                pathname === item.path
                  ? 'text-[#4EFFCA] dark:bg-zinc-900 border-l-8 border-[#4EFFCA]'
                  : ''
              }`}
            >
              <div className="flex items-center justify-center space-x-5">
                {item.icon && (
                  <item.icon className="flex h-6 w-6 items-center justify-center" />
                )}
                <div className="text-sm">{item.heading}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-4 mb-5 rounded-3xl border px-4 py-4 dark:border-gray-600 dark:bg-gray-300/10">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-base font-semibold tracking-tight">Get Result</h3>
          <Button
            variant="outline"
            className="rounded-xl bg-[#4EFFCA] px-4 py-2 font-semibold dark:text-black dark:hover:text-white"
          >
            Pro
          </Button>
        </div>
        <p className="text-sm leading-7 mt-3">
          Get 1 month free and unlock all pro features
        </p>
        <div className="mt-2 flex items-center justify-center">
          <Button className="px-3 text-center" variant="outline">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
