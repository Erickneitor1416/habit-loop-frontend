'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export default function DropDownMenuLogOut() {
  const handleLogout = () => {
    signOut();
  };
  return (
    <DropdownMenuItem onSelect={handleLogout}>
      <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
      Log out
    </DropdownMenuItem>
  );
}
