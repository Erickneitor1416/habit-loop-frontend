import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RegisterButton() {
  return (
    <div className="flex flex-row justify-center items-center">
      <p className="text-lg">Don&apos;t have an account yet?</p>
      <Button asChild className="w-full sm:w-auto" variant="link">
        <Link href="/auth/register">Sign Up</Link>
      </Button>
    </div>
  );
}
