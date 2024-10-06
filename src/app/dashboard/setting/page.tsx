import { getOrganizationDetails } from '@/actions';
import EditOrganization from './_components/EditOrganization';

export default async function SettingsPage() {
  const organization = await getOrganizationDetails();
  return (
    <div>
      <EditOrganization data={organization} />
    </div>
  );
}
