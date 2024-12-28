import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function CreateOrganizationButton() {
  const { pending } = useFormStatus();
  console.log('Pending state:', pending);

  return (
    <Button size="lg" className="my-5" type="submit">
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

export function CreateStudentButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Creating' : 'Create Student'}
    </Button>
  );
}

export function CreateLeadButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Creating Lead' : 'Create Lead'}
    </Button>
  );
}

export function UpdateLeadButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Editing Lead' : 'Edit Lead'}
    </Button>
  );
}

export function CreateGradeButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Creating Grade' : 'Create Grade'}
    </Button>
  );
}
export function DeleteGradeButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Deleting Grade' : 'Delete Grade'}
    </Button>
  );
}

export function CreateSectionButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" type="submit" disabled={pending}>
      {pending ? 'Creating Section' : 'Create Section'}
    </Button>
  );
}
