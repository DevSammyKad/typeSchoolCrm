import { Button } from '@/components/ui/button';

import React from 'react';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  IndianRupee,
  Search,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import prisma from '@/types';

const transactionsData = [
  {
    name: 'Liam Johnson',
    email: 'liam@example.com',
    type: 'Sale',
    status: 'paid',
    date: '2023-06-23',
    amount: '₹250.00',
  },
  {
    name: 'Emma Thompson',
    email: 'emma@example.com',
    type: 'Purchase',
    status: 'unpaid',
    date: '2023-07-15',
    amount: '₹1,500.00',
  },
  {
    name: 'Oliver Brown',
    email: 'oliver@example.com',
    type: 'Refund',
    status: 'Refunded',
    date: '2023-08-02',
    amount: '₹750.00',
  },
  {
    name: 'Sophia Lee',
    email: 'sophia@example.com',
    type: 'Sale',
    status: 'paid',
    date: '2023-09-10',
    amount: '₹3,200.00',
  },
  {
    name: 'Noah Garcia',
    email: 'noah@example.com',
    type: 'Purchase',
    status: 'paid',
    date: '2023-10-05',
    amount: '₹980.00',
  },
];

const teacherSalary = [
  {
    name: 'Rajesh Kumar',
    contact: '9876543210',
    status: 'paid',
    date: '2024-02-14',
    amount: '₹50,000',
  },
  {
    name: 'Priya Sharma',
    contact: '8765432109',
    status: 'pending',
    date: '2024-02-15',
    amount: '₹45,000',
  },
  {
    name: 'Amit Patel',
    contact: '7654321098',
    status: 'paid',
    date: '2024-02-13',
    amount: '₹55,000',
  },
  {
    name: 'Sunita Gupta',
    contact: '6543210987',
    status: 'paid',
    date: '2024-02-12',
    amount: '₹48,000',
  },
  {
    name: 'Vikram Singh',
    contact: '5432109876',
    status: 'pending',
    date: '2024-02-16',
    amount: '₹52,000',
  },
];
export default function Dashboard() {
  const studentCount = prisma.student.count();
  const leadCount = prisma.lead.count();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
        <header>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3 ">
              <DatePickerWithRange />
              <Button>
                {' '}
                <Search className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </header>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            x-chunk="dashboard-01-chunk-0 "
            className=" hover:border-[#4EFFCA] hover:animate-pulse"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupee className="custom_color h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹ 45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{leadCount}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cube Sale</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Student
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{studentCount || 0}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Grade
                    </TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {item.email}
                        </div>
                      </TableCell>
                      <TableCell className="max-md:hidden">
                        {item.type}
                      </TableCell>
                      <TableCell className="">
                        <Badge
                          className={`${
                            item.status === 'paid'
                              ? 'bg-green-50 text-green-500'
                              : item.status === 'pending'
                              ? 'bg-orange-50 text-orange-500'
                              : item.status === 'unpaid'
                              ? 'bg-red-50 text-red-500'
                              : ' '
                          } text-xs `}
                          variant="outline"
                        >
                          {item.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        {item.date}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Subscription
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">₹350.00</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5" className="max">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Teacher Salary</CardTitle>
                <CardDescription>
                  Recent transactions On Teacher Salary.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student </TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherSalary.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {item.contact}
                        </div>
                      </TableCell>

                      <TableCell className="">
                        <Badge
                          className={`${
                            item.status === 'paid'
                              ? 'bg-green-50 text-green-500'
                              : item.status === 'pending'
                              ? 'bg-orange-50 text-orange-500'
                              : ' '
                          } text-xs `}
                          variant="outline"
                        >
                          {item.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        {item.date}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
