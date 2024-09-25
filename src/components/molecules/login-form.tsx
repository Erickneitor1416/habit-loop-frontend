'use client';
import { InputForm } from '@/components/atoms/input-form';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { LoginUser, User } from '@/user/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
export function LoginForm() {
  const router = useRouter();
  const form = useForm<User>({
    resolver: zodResolver(LoginUser),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: User) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      toast({
        title: response.error,
        variant: 'destructive',
      });
      return;
    }
    router.push('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <h2 className="text-2xl font-bold">Sign in</h2>
        <h3 className="text-lg">
          Access to your account to start building healthy habits.
        </h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <InputForm
              label="Email"
              type="email"
              placeholder="Email"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <InputForm
              label="Password"
              type="password"
              placeholder="Password"
              {...field}
            />
          )}
        />

        <Button className="min-w-full" type="submit">
          login
        </Button>
      </form>
    </Form>
  );
}
