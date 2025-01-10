import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import prisma from '@/lib/db';
import { AddSection } from '@/app/components/dashboard/AddSection';
import { Separator } from '@/components/ui/separator';

async function getGradeWithSections(gradeId: string) {
  const grade = await prisma.grade.findUnique({
    where: { id: gradeId },
    include: {
      section: {
        include: {
          students: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
  });
  return grade;
}

export default async function GradePage({
  params,
}: {
  params: { gradeId: string };
}) {
  const gradeId = params.gradeId;
  const grade = await getGradeWithSections(gradeId);

  if (!grade) {
    return <div>Grade not found</div>;
  }
  return (
    <div className="">
      <div className="flex items-center justify-between mb-4  ">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/grades">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Grade : {grade.grade}</h1>
            <p className="text-muted-foreground">Sections for {grade.grade}</p>
          </div>
        </div>

        <AddSection gradeId={gradeId} />
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {grade.section.map((section) => (
          <Card key={section.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{section.name}</h2>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/grades/${gradeId}/${section.id}/delete`}
                  >
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Class Teacher: Vaish lemon
                </p>
                <p className="text-muted-foreground">
                  {section.students.length} students
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
