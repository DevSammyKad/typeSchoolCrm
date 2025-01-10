// pages/holidays.tsx
import prisma from '@/lib/db';
import HolidaysUploader from '../_components/HolidaysUploader';
import HolidaysTable from './HolidaysTable';

export const dynamic = 'force-dynamic';

const page = async () => {
  const organizationId = '212b7959-4a3a-43dc-8a53-7607e0ee2d17';
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
