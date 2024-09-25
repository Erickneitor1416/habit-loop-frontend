import { Signature } from '@/components';
import Image from 'next/image';

export default function AuthPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:py-24 py-2">
      <Signature />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center text-sm w-full max-w-5xl">
        {children}
        <div className="hidden md:flex relative z-[-1] place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] invert dark:invert-0 dark:bg-transparent"
            src="/habit-loop-logo.png"
            alt="Logo"
            width={500}
            height={37}
            priority
          />
        </div>
      </div>
    </main>
  );
}
