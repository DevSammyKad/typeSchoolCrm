import React from 'react';
import { Edit2, GraduationCap, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';
import { AddGrade } from '@/app/components/dashboard/AddGrade';

async function getGrades() {
  const grades = await prisma.grade.findMany({
    include: {
      section: {
        include: {
          students: true,
        },
      },
    },
  });
  return grades;
}

const GradeListing = async () => {
  const grades = await getGrades();

  return (
    <aside className="col-span-3 border-r p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <GraduationCap className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Classes</h1>
        </div>
        <AddGrade />
      </div>

      <Input placeholder="Search classes..." className="mb-4" />

      <div className="space-y-4">
        {grades.map((grade) => (
          <Link
            key={grade.id}
            href={`/dashboard/grades/${grade.id}`}
            className="block"
          >
            <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-100">
              <div>
                <h2 className="font-semibold">{grade.grade}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <p>{grade.section.length} Sections</p>
                  <p>
                    {grade.section.reduce(
                      (acc, section) => acc + section.students.length,
                      0
                    )}{' '}
                    students
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <Link href={`/dashboard/grades/${grade.id}/delete`}>
                    <Trash2 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default GradeListing;
