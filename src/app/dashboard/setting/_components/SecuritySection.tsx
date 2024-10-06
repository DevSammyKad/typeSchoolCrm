'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster, toast } from 'sonner';

// ...

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
// import FileUploaderTest from "@/components/FileUploader";
import { Textarea } from '@/components/ui/textarea';

const SecuritySection = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure your security settings here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Security Setting" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecuritySection;
