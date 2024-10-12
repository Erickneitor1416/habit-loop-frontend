import { NavBar } from '@/components';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex h-screen flex-col items-center justify-center min-w-full">
      <NavBar />
      {children}
    </section>
  );
}
