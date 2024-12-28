'use client';

import { deleteSection } from '@/actions';
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

export default function sectionDeleteRoute({
  params,
}: {
  params: { sectionId: string };
}) {
  const sectionId = params.sectionId;

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
              formData.append('sectionId', sectionId);
              await deleteSection(formData);
            }}
          >
            <DeleteSectionButton />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

function DeleteSectionButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      {pending ? 'Deleting...' : 'Delete Grade'}
    </Button>
  );
}
