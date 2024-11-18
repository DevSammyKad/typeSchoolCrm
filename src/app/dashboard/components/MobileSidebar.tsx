'use client';

import React, { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideNav from './SideNav';

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };
  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden">
          <MenuIcon className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SideNav closeSidebar={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
