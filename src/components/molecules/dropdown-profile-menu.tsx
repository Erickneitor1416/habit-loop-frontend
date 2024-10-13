'use server';
import { Avatar, DropDownMenuLogOut } from '@/components/atoms';
import { ToggleModeMenuItem } from '@/components/molecules';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { config } from '@/lib/next-auth-config';
import { ListTodo, Plus } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export async function DropdownProfileMenu() {
  const session = await getServerSession(config);
  const name = session?.user?.name!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar name={name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/habits">
            <DropdownMenuItem>
              <ListTodo className="h-[1.2rem] w-[1.2rem] mr-2" />
              Habits
            </DropdownMenuItem>
          </Link>
          <ToggleModeMenuItem />
          <DialogTrigger className="min-w-full">
            <DropdownMenuItem>
              <Plus className="h-[1.2rem] w-[1.2rem] mr-2" />
              New Habit
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropDownMenuLogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
