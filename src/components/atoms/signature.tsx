import { ModeToggle } from '@/components/ui/toggle-mode';
import Link from 'next/link';

export default function Signature() {
  return (
    <div className="fixed left-0 top-0 flex w-full items-center lg:justify-between lg:gap-0 justify-center gap-3 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
      <Link
        className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mx-5"
        href="/"
      >
        <h1>
          Habit Loop app{''}
          <span>
            &nbsp;<code className="font-mono font-bold">by Erick Muñoz</code>
          </span>
        </h1>
      </Link>
      <ModeToggle />
    </div>
  );
}
