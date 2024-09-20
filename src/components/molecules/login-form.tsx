'use client';

import { InputForm } from '@/components/atoms/input-form';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { LoginUser, User } from '@/user/domain';
import { loginAction } from '@/user/infrastructure/actions/user-form.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const form = useForm<User>({
    resolver: zodResolver(LoginUser),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: User) => {
    const isSaved = await loginAction(data);
    if (isSaved) {
      toast({
        title: isSaved.message,
        variant: isSaved.error ? 'destructive' : 'default',
      });
    }
  };

  return (
    <div className="flex-1 flex justify-center min-w-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
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
    </div>
  );
}
