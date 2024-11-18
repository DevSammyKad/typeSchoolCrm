export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" mx-auto">
      <main className="mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
