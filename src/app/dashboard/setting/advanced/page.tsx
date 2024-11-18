// pages/holidays.tsx
import prisma from '@/lib/db';
import HolidaysUploader from '../_components/HolidaysUploader';
import HolidaysTable from './HolidaysTable';

const page = async () => {
  const organizationId = '6e6bd690-58ed-4d54-9037-893cd6cd45e8';
  const holidays = await prisma.holiday.findMany({
    where: { organizationId },
    orderBy: { date: 'asc' },
  });

  return (
    <div>
      <p>Upload CSV File, preview holidays data, and then click on Submit...</p>
      <HolidaysUploader />
      <HolidaysTable initialHolidays={holidays} />
    </div>
  );
};

export default page;
