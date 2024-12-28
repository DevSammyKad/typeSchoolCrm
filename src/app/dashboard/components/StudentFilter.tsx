'use client'; // This makes it a client-side component

import GradeSelect from '@/app/components/dashboard/GradeSelect';
import SectionSelect from '@/app/components/dashboard/SectionSelect';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function StudentFilter() {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');

  const router = useRouter();

  const handleFilter = () => {
    const queryParams = new URLSearchParams();

    if (selectedGrade) queryParams.append('grade', selectedGrade);
    if (selectedSection) queryParams.append('section', selectedSection);

    router.push(`/dashboard/students?${queryParams.toString()} `);
  };
  return (
    <div className="flex gap-4 w-full">
      {/* Grade Select */}
      <GradeSelect defaultGrade="" selectedGrade={setSelectedGrade} />

      {/* Section Select */}
      <SectionSelect
        selectedGradeId={selectedGrade}
        onSelectSection={setSelectedSection}
      />
      <Button onClick={handleFilter} disabled={!selectedGrade}>
        <Search className="mr-2" />
        Search
      </Button>
    </div>
  );
}
