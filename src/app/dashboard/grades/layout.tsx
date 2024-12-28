import GradeListing from '@/app/components/dashboard/GradeListing';

export default async function GradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 border rounded-2xl border-gray-200 pb-4">
      {/* Sidebar */}
      <GradeListing />

      {/* Main Content */}
      <main className="col-span-9 p-6">{children}</main>
    </div>
  );
}
