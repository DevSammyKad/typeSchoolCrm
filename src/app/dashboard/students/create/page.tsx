'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StudentFormData, studentSchema } from '@/lib/zodSchemas';
import { createStudent } from '@/actions';
import { useFormState } from 'react-dom';
import GradeSelect from '@/app/components/dashboard/GradeSelect';
import { useState } from 'react';
import SectionSelect from '@/app/components/dashboard/SectionSelect';

export default function StudentForm() {
  const [lastResult, action] = useFormState(createStudent, undefined);
  const [form, fields] = useForm<StudentFormData>({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: studentSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');

  console.log('selectedGrade', selectedGrade);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form action={action} id={form.id} onSubmit={form.onSubmit}>
        <CardHeader>
          <CardTitle>New Student Registration</CardTitle>
          <CardDescription>
            Enter the student's information to register them in the system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gradeName">First Name</Label>
              <Input
                id="gradeName"
                placeholder="Enter Grade name"
                name={fields.firstName.name}
                defaultValue={fields.firstName.initialValue}
                key={fields.firstName.key}
                className="col-span-3"
              />
              <span className="text-xs text-red-500 block my-4 h-2">
                {fields.firstName.errors}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">last Name</Label>
              <Input
                id="lastName"
                placeholder="Enter Grade name"
                name={fields.lastName.name}
                defaultValue={fields.lastName.initialValue}
                key={fields.lastName.key}
                className="col-span-3"
              />
              <span className="text-xs text-red-500 block my-4 h-2">
                {fields.firstName.errors}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter Grade name"
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
                key={fields.email.key}
                className="col-span-3"
              />
              <span className="text-xs text-red-500 block my-4 h-2">
                {fields.email.errors}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                name={fields.gender.name}
                defaultValue={fields.gender.initialValue}
                key={fields.gender.key}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-red-500 block my-4 h-2">
                {fields.gender.errors}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="Age"
                name={fields.age.name}
                defaultValue={fields.age.initialValue}
                key={fields.age.key}
                className="col-span-3"
              />
              <span className="text-xs text-red-500 block my-4 h-2">
                {fields.age.errors}
              </span>
            </div>
            <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Phone"
                  name={fields.phoneNumber.name}
                  defaultValue={fields.phoneNumber.initialValue}
                  key={fields.phoneNumber.key}
                  className="col-span-3"
                />
                <span className="text-xs text-red-500 block my-4 h-2">
                  {fields.phoneNumber.errors}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter Address"
              name={fields.address.name}
              defaultValue={fields.address.initialValue}
              key={fields.address.key}
              className="col-span-3"
            />
            <span className="text-xs text-red-500 block my-4 h-2">
              {fields.address.errors}
            </span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentContact">Parent Contact</Label>
            <Input
              id="parentContact"
              placeholder="Parent Contact"
              name={fields.parentContact.name}
              defaultValue={fields.parentContact.initialValue}
              key={fields.parentContact.key}
              className="col-span-3"
            />
            <span className="text-xs text-red-500 block my-4 h-2">
              {fields.parentContact.errors}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="hidden" name="organizationId" />

            <GradeSelect
              selectedGrade={(id) => setSelectedGrade(id)} // Pass numeric ID
              defaultGrade={selectedGrade.toString()} // Ensure consistent type
            />

            <SectionSelect
              selectedGradeId={selectedGrade}
              onSelectSection={setSelectedSection}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Register Student
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
