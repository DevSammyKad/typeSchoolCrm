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
} from 'lucide-react';

export const NavLinks = [
  {
    path: '/dashboard',
    heading: 'DashBoard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'TEACHER', 'STUDENT'],
  },
  {
    path: '/dashboard/leads',
    heading: 'Leads',
    icon: User,
    roles: ['ADMIN'],
  },
  {
    path: '/dashboard/grades',
    heading: 'Class',
    icon: LeafyGreen,
    roles: ['TEACHER', 'ADMIN'],
  },
  {
    path: '/dashboard/students',
    heading: 'Students',
    icon: Users,
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    path: '/dashboard/attendance',
    heading: 'Attendance',
    icon: Users,
    roles: ['TEACHER', 'ADMIN'], // ADMIN and Teacher
  },
  {
    path: '/dashboard/teachers',
    heading: 'Teachers',
    icon: TicketCheck,
    roles: ['ADMIN'], // ADMIN only
  },
  {
    path: '/dashboard/setting',
    heading: 'Setting',
    icon: Settings,
    roles: ['ADMIN', 'TEACHER', 'STUDENT'], // Available to all
  },
  {
    path: '/Help-Center',
    heading: 'Help Center',
    icon: HelpCircle,
    roles: ['ADMIN', 'TEACHER', 'STUDENT'], // Available to all
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
