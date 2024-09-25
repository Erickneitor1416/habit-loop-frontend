import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LoginButton() {
  return (
    <div className="flex flex-row justify-center items-center">
      <p className="text-lg text-gray-600">Already have an account?</p>
      <Button asChild variant="link" className="w-full sm:w-auto">
        <Link href="/auth/login">Log In</Link>
      </Button>
    </div>
  );
}
