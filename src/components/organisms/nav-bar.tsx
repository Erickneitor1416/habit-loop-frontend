import { DropdownProfileMenu } from '@/components/molecules';
import { CreateHabitDialog } from '@/components/organisms';
import Image from 'next/image';
import Link from 'next/link';
export default function NavBar() {
  return (
    <nav className="fixed left-0 top-0 flex w-full items-center justify-between lg:gap-0 gap-3 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-4 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 p-4 lg:dark:bg-zinc-800/30">
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
