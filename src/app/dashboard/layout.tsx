import { NavBar } from '@/components';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex min-h-screen flex-col items-center min-w-full">
      <NavBar />
      <main className="flex-grow container mx-auto px-0 py-8">{children}</main>
    </section>
  );
}
