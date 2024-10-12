import { DropdownProfileMenu } from '@/components/molecules';
import { CreateHabitDialog } from '@/components/organisms';
import Image from 'next/image';
import Link from 'next/link';
export default function NavBar() {
  return (
    <nav className="fixed top-0 flex w-[99%] items-center justify-between lg:gap-0 gap-3 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 p-3 lg:dark:bg-zinc-800/30 sm:rounded-md my:0 sm:my-2 z-20">
      <Link href="/dashboard">
        <div className="flex items-center flex-row justify-start gap-1 overflow-hidden max-h-11">
          <Image
            className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] invert dark:invert-0 dark:bg-transparent"
            src="/habit-loop-logo.png"
            alt="Logo"
            width={70}
            height={70}
            priority
          />
          <h1>
            &nbsp;<code className="font-mono font-bold">by Erick Muñoz</code>
          </h1>
        </div>
      </Link>
      <CreateHabitDialog>
        <DropdownProfileMenu />
      </CreateHabitDialog>
    </nav>
  );
}
