import { LoginButton, RegistrationForm } from '@/components';

export default function RegisterPage() {
  return (
    <div className="flex-1 flex flex-col justify-center min-w-xl items-center space-y-4">
      <RegistrationForm />
      <LoginButton />
    </div>
  );
}
