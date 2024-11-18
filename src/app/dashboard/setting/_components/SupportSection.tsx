import { Button } from '@/components/ui/button';

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
import { Textarea } from '@/components/ui/textarea';

const SupportSection = () => {
  return (
    <div>
      <div className="grid gap-5">
        <Card>
          <CardHeader>
            <CardTitle>24/7 Support</CardTitle>
            <CardDescription>
              You can ask me anything about SAAS{' '}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="my-5">
              <form>
                <div className="grid gap-3">
                  <Label>Ask Problems</Label>
                  <Textarea placeholder="How i can add bulk leads ?" />
                </div>
              </form>
            </div>
            <Label>Also you can add Attachment</Label>
            {/* <FileUploaderTest /> */}
          </CardContent>
          <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button className="flex justify-end">SEND</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SupportSection;
