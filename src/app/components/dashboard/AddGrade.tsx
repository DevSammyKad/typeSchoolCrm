'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { gradeSchema } from '@/lib/zodSchemas';
import { useFormState } from 'react-dom';
import { createGrade } from '@/actions';
import { CreateGradeButton } from '@/components/SubmitButton';

export function AddGrade() {
  const [lastResult, action] = useFormState(createGrade, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: gradeSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Grade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Grade for school</DialogTitle>
          <DialogDescription>
            Create a new grade for your school.
          </DialogDescription>
        </DialogHeader>
        <form action={action} id={form.id} onSubmit={form.onSubmit}>
          <div className="grid  items-center gap-4">
            <Label htmlFor="gradeName" className="text-left">
              Grade Name
            </Label>
            <Input
              id="gradeName"
              placeholder="Enter Grade name"
              name={fields.grade.name}
              defaultValue={fields.grade.initialValue}
              key={fields.grade.key}
              className="col-span-3"
            />
          </div>
          <span className="text-xs text-red-500 block my-4 h-2">
            {fields.grade.errors}
          </span>
          <div className="flex justify-between items-center">
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <CreateGradeButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
