'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { RegisterUser, User } from '@/user/domain';
import { registerAction } from '@/user/infrastructure/actions/user.form-actions';
import { InputForm } from '../atoms/input-form';
import { toast } from '../ui/use-toast';

export function RegistrationForm() {
  const form = useForm<User>({
    resolver: zodResolver(RegisterUser),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: User) => {
    const isSaved = await registerAction(data);
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
          <h2 className="text-2xl font-bold">Sign up</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputForm
                label="Name"
                placeholder="Name"
                description="This is your public display name."
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputForm
                label="Email"
                type="email"
                placeholder="Email"
                description="We'll never share your email with anyone else."
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
                description="Use at least one lowercase letter, one numeral, and seven
                  characters."
                {...field}
              />
            )}
          />

          <Button className="min-w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
