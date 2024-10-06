import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export function CreateOrganizationButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="gooeyLeft"
      size="lg"
      className="my-5"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create Organization'}
    </Button>
  );
}
export function UpdateOrganizationButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="gooeyLeft"
      size="lg"
      className="my-5"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Updating...' : 'Update Organization'}
    </Button>
  );
}

export function createStudentButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Creating' : 'Create Student'}
    </Button>
  );
}
