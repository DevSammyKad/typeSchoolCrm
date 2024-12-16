'use client';

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

import { editLead } from '@/actions';
import { leadSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { useForm } from '@conform-to/react';
import { useFormState } from 'react-dom';
import { LeadSource, LeadStatus } from '@prisma/client';
import { UpdateLeadButton } from '@/components/SubmitButton';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const source = Object.keys(LeadSource);
const status = Object.keys(LeadStatus);

interface iAppProps {
  data: {
    id: string;
    leadName: string;
    leadAge: number | null;
    leadStatus: LeadStatus;
    leadSource: LeadSource;
    leadPhoneNumber: string;
    leadEmail: string;
    note: string | null;
  };
}

const EditLeadForm = ({ data }: iAppProps) => {
  const [lastResult, action] = useFormState(editLead, undefined);
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
    defaultValue: data,
  });

  console.log('Data in parent:', data);

  console.log('Form state:', form);
  console.log('Form fields:', fields);

  return (
    <>
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Lead </CardTitle>
          <CardDescription>Edit Manual Lead using this form</CardDescription>
          <CardContent>
            <form id={form.id} onSubmit={form.onSubmit} action={action}>
              <input type="hidden" name="leadId" value={data.id} />

              <div className="mt-5 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Full Name"
                      key={fields.leadName.key}
                      name={fields.leadName.name}
                      defaultValue={data.leadName}
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
                        defaultValue={data.leadAge || ''}
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
                    <Label htmlFor="source">Lead Source</Label>
                    <Select
                      key={fields.leadSource.key}
                      name={fields.leadSource.name}
                      defaultValue={data.leadSource}
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
                      defaultValue={data.leadStatus}
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
                  <PhoneInput
                    className="focus:border-none focus:ring-0 "
                    placeholder="+91 845900 10000"
                    key={fields.leadPhoneNumber.key}
                    name={fields.leadPhoneNumber.name}
                    defaultValue={data.leadPhoneNumber}
                  />

                  <span className="text-xs text-red-500">
                    {fields.leadPhoneNumber.errors}
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    key={fields.leadEmail.key}
                    name={fields.leadEmail.name}
                    defaultValue={data.leadEmail}
                  />
                  <span className="text-xs text-red-500">
                    {fields.leadEmail.errors}
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Note</Label>
                  <Textarea
                    id="note"
                    key={fields.note.key}
                    name={fields.note.name}
                    defaultValue={data.note || ' '}
                    className="min-h-32"
                    placeholder="Write your Note here"
                  />
                  <p className="text-sm text-red-500">{fields.note.errors}</p>
                </div>
              </div>

              <UpdateLeadButton />
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default EditLeadForm;
