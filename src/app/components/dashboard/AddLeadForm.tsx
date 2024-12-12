import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { createLead } from '@/actions';
import { leadSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { useForm } from '@conform-to/react';
import { useFormState } from 'react-dom';
import { LeadSource, LeadStatus } from '@prisma/client';
import { CreateLeadButton } from '@/components/SubmitButton';

const source = Object.keys(LeadSource);
const status = Object.keys(LeadStatus);

const AddLeadForm = () => {
  const [lastResult, action] = useFormState(createLead, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: leadSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Create Lead</Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogContent>
            <DialogTitle>Create Lead</DialogTitle>
            <DialogDescription>
              Create Manual Lead using this form
            </DialogDescription>
            <form
              id={form.id}
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Form submitted');
                form.onSubmit(e); // Continue with form submission
              }}
              action={action}
            >
              <div className="mt-5 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Full Name"
                      key={fields.leadName.key}
                      name={fields.leadName.name}
                      defaultValue={fields.leadName.initialValue}
                    />
                    <span className="text-xs text-red-500">
                      {fields.leadName.errors}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        key={fields.leadAge.key}
                        name={fields.leadAge.name}
                        defaultValue={fields.leadAge.initialValue}
                        placeholder="age : 22"
                      />
                      <span className="text-xs text-red-500">
                        {fields.leadAge.errors}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
                    <Select
                      key={fields.leadSource.key}
                      name={fields.leadSource.name}
                      defaultValue={fields.leadSource.initialValue}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                      <SelectContent>
                        {source?.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-red-500">
                      {fields.leadSource.errors}
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="grade">Status</Label>
                    <Select
                      key={fields.leadStatus.key}
                      name={fields.leadStatus.name}
                      defaultValue={fields.leadStatus.initialValue}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {status?.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-red-500">
                      {fields.leadStatus.errors}
                    </span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone</Label>
                  <input
                    type="text"
                    key={fields.leadPhoneNumber.key}
                    name={fields.leadPhoneNumber.name}
                    defaultValue={fields.leadPhoneNumber.initialValue}
                  />
                  <span className="text-xs text-red-500">
                    {fields.leadPhoneNumber.errors}
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Note</Label>
                  <Textarea
                    id="note"
                    key={fields.note.key}
                    name={fields.note.name}
                    defaultValue={fields.note.initialValue}
                    className="min-h-32"
                    placeholder="Write your Note here"
                  />
                  <p className="text-sm text-red-500">{fields.note.errors}</p>
                </div>
              </div>

              <DialogFooter>
                <CreateLeadButton />
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogHeader>
      </Dialog>
    </>
  );
};

export default AddLeadForm;
