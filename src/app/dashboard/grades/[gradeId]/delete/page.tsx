'use client';

import { deleteGrade } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

export default function DeleteGradePage({
  params,
}: {
  params: { gradeId: string };
}) {
  const gradeId = parseInt(params.gradeId, 10);

  return (
    <div className="h-[80vh] flex justify-center items-center w-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            <strong className="text-red-500"> Grade </strong> and all its data,
            including{' '}
            <strong className="text-red-500">Sections and Students</strong>.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end flex gap-3 items-center">
          <Link href="/dashboard/grades">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <form
            action={async () => {
              const formData = new FormData();
              formData.append('gradeId', gradeId.toString());
              await deleteGrade(formData);
            }}
          >
            <DeleteGradeButton />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

function DeleteGradeButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      {pending ? 'Deleting...' : 'Delete Grade'}
    </Button>
  );
}
