'use client'; // This makes it a client-side component

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useState } from 'react';

// Props passed from the server component
interface StudentFilterProps {
  grades: { id: number; name: string }[];
  sections: { id: string; name: string }[];
}

export default function StudentFilter({
  grades,
  sections,
}: StudentFilterProps) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
    setSelectedSection(null); // Reset section when grade changes
  };

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
  };

  // Filter sections based on the selected grade
  const filteredSections = sections.filter((section) => {
    return section.id === selectedGrade; // Assuming `gradeId` exists in `sections`
  });

  return (
    <div className="flex gap-4 w-full">
      {/* Grade Select */}
      <Select onValueChange={handleGradeChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Grade" />
        </SelectTrigger>
        <SelectContent>
          {grades.map((grade) => (
            <SelectItem key={grade.id} value={grade.id as unknown as string}>
              {grade.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Section Select */}
      <Select onValueChange={handleSectionChange} disabled={!selectedGrade}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent>
          {filteredSections.map((section) => (
            <SelectItem key={section.id} value={section.id}>
              {section.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
