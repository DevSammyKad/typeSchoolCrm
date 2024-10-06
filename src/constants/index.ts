import {
  BellDot,
  HelpCircle,
  LayoutDashboard,
  LeafyGreen,
  OutdentIcon,
  Settings,
  Settings2,
  TicketCheck,
  User,
  Users,
  Users2,
} from 'lucide-react';

export const NavLinks = [
  {
    path: '/dashboard',
    heading: 'DashBoard',
    icon: LayoutDashboard,
  },
  {
    path: '/dashboard/leads',
    heading: 'Leads',
    icon: User,
  },
  {
    path: '/dashboard/courses',
    heading: 'Courses',
    icon: LeafyGreen,
  },
  {
    path: '/dashboard/students',
    heading: 'Students',
    icon: Users,
  },
  {
    path: '/dashboard/studentsAttendance',
    heading: 'Attendance',
    icon: Users,
  },
  {
    path: '/dashboard/teachers',
    heading: 'Teachers',
    icon: TicketCheck,
  },
  {
    path: '/dashboard/setting',
    heading: 'Setting',
    icon: Settings,
  },
  {
    path: '/Help-Center',
    heading: 'Help Center',
    icon: HelpCircle,
  },
];

export const NavDropDownData = [
  {
    path: '/setting',
    heading: 'My Profile',
    icon: Settings2,
  },
  {
    path: '/setting/Notification',
    heading: 'Mute Notification',
    icon: BellDot,
  },
  {
    path: '/setting',
    heading: 'Setting',
    icon: Settings,
  },
  {
    path: '/Help-Center',
    heading: 'Help Center',
    icon: HelpCircle,
  },
  {
    path: '/Sign Out',
    heading: 'Sign Out',
    icon: OutdentIcon,
  },
];
