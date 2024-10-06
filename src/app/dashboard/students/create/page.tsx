import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createStudentButton } from '@/components/SubmitButton';
import { Label } from '@/components/ui/label';

export default function createStudents() {
  return (
    <div>
      <form action="">
        <Card>
          <CardHeader>
            <CardTitle>Create New Student</CardTitle>
            <CardDescription>xyz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:space-y-5">
                <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Student First Name"
                    type="text"
                  />
                  <span className="text-red-500 text-sm h-1">
                    {/* {fields.organizationName.errors} */}
                    Error
                  </span>
                </div>
                <div className="grid gap-3">
                  <Input placeholder="Student Last Name" type="text" />
                  <p className="text-red-500 text-sm">Error</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:space-y-5"></div>
            </div>
          </CardContent>
          {/* <CardFooter className="px-6 py-4 flex">
            <createStudentButton />
          </CardFooter> */}
        </Card>
      </form>
    </div>
  );
}
