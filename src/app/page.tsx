import { Signature } from '@/components';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center md:py-24 py-2">
      <Signature />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center text-sm w-full max-w-5xl">
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
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Habit Loop</h1>
            <p className="text-xl mb-8 max-w-md mx-auto text-gray-600">
              Track your daily activities and build positive habits that
              transform your life.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/auth/login">Log In</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          </div>
          <footer className="mt-8 text-sm text-gray-500">
            © 2023 Habit Loop. All rights reserved.
          </footer>
        </div>
      </div>
    </main>
  );
}
