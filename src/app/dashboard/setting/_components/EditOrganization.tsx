'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useFormState } from 'react-dom';
import { editOrganization } from '@/actions';
import { parseWithZod } from '@conform-to/zod';
import { organizationSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';

import { UpdateOrganizationButton } from '@/components/SubmitButton';

interface iAppProps {
  data?: {
    id: string;
    organizationName: string;
    organizationMail: string;
    subdomain: string;
    organizationPanCard: string;
    organizationType: string;
    organizationWebsite: string;
  };
}

export default function EditOrganization({ data }: iAppProps) {
  if (!data?.id) {
    console.error('No organization ID provided');
  }
  console.log('Organization ID:', data?.id);

  // Use `useForm` to handle form state and validation
  const [lastResult, action] = useFormState(editOrganization, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: organizationSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    defaultValue: data,
    // defaultValue: {
    //   organizationId: data?.id,
    //   organizationName: data?.organizationName,
    //   organizationMail: data?.organizationMail,
    //   subdomain: data?.subdomain,
    //   organizationPanCard: data?.organizationPanCard,
    //   organizationType: data?.organizationType,
    //   organizationWebsite: data?.organizationWebsite,
    // },
  });

  return (
    <form action={action} id={form.id} onSubmit={form.onSubmit}>
      <input type="hidden" name="organizationId" value={data?.id} />

      <div className="grid gap-5 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Update Organization</CardTitle>
            <CardDescription>
              Configure your organization settings here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-10">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:space-y-5">
                {/* Organization Name */}
                <div className="relative grid w-full gap-3">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="For Ex- RSAI PVT"
                    key={fields.organizationName.key}
                    name={fields.organizationName.name}
                    defaultValue={data?.organizationName}

                    // ? IF defaultValue value is not working Then use // =>  defaultValue={fields.subdomain.initialValue}

                    // value={organizationName}
                    // onChange={(e) => setOrganizationName(e.target.value)}
                  />
                  <span className="text-red-500 text-sm">
                    {fields.organizationName.errors}
                  </span>
                </div>

                {/* Organization Type */}
                <div className="grid w-full gap-3">
                  <Label htmlFor="organizationType">Organization Type</Label>
                  <Input
                    id="organizationType"
                    placeholder="For Ex - College, Classes, School"
                    key={fields.organizationType.key}
                    name={fields.organizationType.name}
                    defaultValue={data?.organizationType}
                    // value={organizationType}
                    // onChange={(e) => setOrganizationType(e.target.value)}
                  />
                  <span className="text-red-500 text-sm h-1">
                    {fields.organizationType.errors}
                  </span>
                </div>
              </div>

              {/* Organization Mail and PAN Card */}
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
                    defaultValue={data?.organizationMail}
                    // value={organizationMail}
                    // onChange={(e) => setOrganizationMail(e.target.value)}
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
                    // value={organizationPanCard}
                    // onChange={(e) => setOrganizationPanCard(e.target.value)}
                  />
                  <span className="text-red-500 text-sm h-1">
                    {fields.organizationPanCard.errors}
                  </span>
                </div>
              </div>

              {/* Organization Website */}
              <div className="grid w-full gap-3">
                <Label htmlFor="organizationWebsite">
                  Organization Website (Optional)
                </Label>
                <Input
                  id="organizationWebsite"
                  placeholder="For ex: Kritischool.com"
                  key={fields.organizationWebsite.key}
                  name={fields.organizationWebsite.name}
                  defaultValue={data?.organizationWebsite}
                  // value={organizationWebsite}
                  // onChange={(e) => setOrganizationWebsite(e.target.value)}
                />
                <span className="text-red-500 text-sm h-1">
                  {fields.organizationWebsite.errors}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subdomain */}
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
                  defaultValue={data?.subdomain}
                  // value={subdomain}
                  // onChange={(e) => setSubdomain(e.target.value)}
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
          <CardFooter className="px-6 py-4 flex">
            <UpdateOrganizationButton />
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
