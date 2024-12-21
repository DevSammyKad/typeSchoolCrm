'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
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
import { sectionSchema } from '@/lib/zodSchemas';
import { useFormState } from 'react-dom';
import { createSection } from '@/actions';
import { CreateSectionButton } from '@/components/SubmitButton';

export function AddSection() {
  const [lastResult, action] = useFormState(createSection, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: sectionSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Grade for gradeId </DialogTitle>
          <DialogDescription>
            Create a new grade for your school.
          </DialogDescription>
        </DialogHeader>
        <form action={action} id={form.id} onSubmit={form.onSubmit}>
          <div className="grid  items-center gap-4">
            <Label htmlFor="sectionName" className="text-left">
              Section Name
            </Label>
            <Input
              id="sectionName"
              placeholder="Enter section name"
              name={fields.name.name}
              defaultValue={fields.name.initialValue}
              key={fields.name.key}
              className="col-span-3"
            />
          </div>
          <span className="text-xs text-red-500 block my-4 h-2">
            {fields.name.errors}
          </span>

          <CreateSectionButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
