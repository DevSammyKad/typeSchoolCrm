'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ...

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
// import FileUploaderTest from "@/components/FileUploader";

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
