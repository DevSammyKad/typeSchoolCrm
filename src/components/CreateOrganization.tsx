'use client';

import { createOrganization } from '@/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { organizationSchema } from '@/lib/zodSchemas';
import { useFormState } from 'react-dom';
import CreateOrganizationButton from './SubmitButton';

export default function CreateOrganizationPage() {
  const [lastResult, action] = useFormState(createOrganization, undefined);
  console.log('Last Result:', lastResult);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: organizationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <form action={action} id={form.id} onSubmit={form.onSubmit}>
      <div className="grid gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Create Organization </CardTitle>
            <CardDescription>
              Configure your organization settings here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-10">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:space-y-5">
                <div className="relative grid w-full gap-3">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="For Ex- RSAI PVT"
                    key={fields.organizationName.key}
                    name={fields.organizationName.name}
                    defaultValue={fields.organizationName.initialValue}
                  />

                  <span className="text-red-500 text-sm h-1"></span>
                </div>
                <div className="grid w-full gap-3">
                  <Label htmlFor="organizationType">Organization Type</Label>
                  <Input
                    id="organizationType"
                    placeholder="For Ex - College, Classes, School"
                    key={fields.organizationType.key}
                    name={fields.organizationType.name}
                    defaultValue={fields.organizationType.initialValue}
                  />
                  <span className="text-red-500 text-sm h-1">
                    {fields.organizationType.errors}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:space-y-5">
                <div className="relative grid w-full gap-3">
                  <Label htmlFor="organizationMail">
                    Organization Official Mail
                  </Label>
                  <Input
                    id="organizationMail"
                    type="email"
                    placeholder="For ex- rsai@gmail.com"
                    key={fields.organizationMail.key}
                    name={fields.organizationMail.name}
                    defaultValue={fields.organizationMail.initialValue}
                  />
                  <span className="text-red-500 text-sm h-1">
                    {fields.organizationMail.errors}
                  </span>
                </div>
                <div className="relative grid w-full gap-3">
                  <Label htmlFor="organizationPanCard">
                    PAN Card No (ADMIN)
                  </Label>
                  <Input
                    id="organizationPanCard"
                    placeholder="JYCPK2000A"
                    key={fields.organizationPanCard.key}
                    name={fields.organizationPanCard.name}
                    defaultValue={fields.organizationPanCard.initialValue}
                    onChange={(e) => {
                      e.target.value = e.target.value.toLocaleUpperCase();
                    }}
                  />
                  <span className="text-red-500 text-sm h-1">
                    {fields.organizationPanCard.errors}
                  </span>
                </div>
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="organizationWebsite">
                  Organization Website (Optional)
                </Label>
                <Input
                  id="organizationWebsite"
                  placeholder="For ex: Kritischool.com"
                  key={fields.organizationWebsite.key}
                  name={fields.organizationWebsite.name}
                  defaultValue={fields.organizationWebsite.initialValue}
                  prefix="https://"
                />
                <span className="text-red-500 text-sm h-1">
                  {fields.organizationWebsite.errors}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>
              Configure your organization Subdomain here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              <Label htmlFor="organizationSubdomain">
                Organization Subdomain
              </Label>
              <div className="flex items-center">
                <Input
                  id="organizationSubdomain"
                  key={fields.subdomain.key}
                  name={fields.subdomain.name}
                  defaultValue={fields.subdomain.initialValue}
                  onChange={(e) => {
                    e.target.value = e.target.value.toLocaleLowerCase();
                  }}
                  className="rounded-r-none focus-visible:ring-0"
                />
                <span className="inline-flex h-10 items-center rounded-r-md border text-green-500 border-l-0 border-input bg-background px-3 text-sm text-muted-foreground">
                  .nexus.com
                </span>
              </div>
              <span className="text-red-500 text-sm h-1">
                {fields.subdomain.errors}
              </span>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 flex "></CardFooter>
        </Card>
        <CreateOrganizationButton />
      </div>
    </form>
  );
}
