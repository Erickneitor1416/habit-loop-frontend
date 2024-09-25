import { LoginForm, RegisterButton } from '@/components';

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center min-w-xl items-center space-y-4">
      <LoginForm />
      <RegisterButton />
    </div>
  );
}
