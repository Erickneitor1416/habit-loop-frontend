'use client';
import { InputForm, Select } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Frequency, Habit, HabitSchema } from '@/habit/domain';
import { createHabitAction } from '@/habit/infrastructure/actions/habit-form.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export function CreateHabitForm() {
  const form = useForm<Habit>({
    resolver: zodResolver(HabitSchema),
    defaultValues: {
      name: '',
      description: '',
      frequency: Frequency.DAILY,
    },
  });
  const { data: session } = useSession();
  const onSubmit = async (data: Habit) => {
    let message: string = '';
    let variant: 'default' | 'destructive' = 'default';
    try {
      message = await createHabitAction(data, session?.user?.accessToken ?? '');
    } catch (error) {
      message = (error as Error).message;
      variant = 'destructive';
    } finally {
      form.reset();
      toast({
        title: message,
        variant,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <InputForm label="Name" placeholder="Enter habit name" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <InputForm
              label="Description"
              placeholder="Enter habit description"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <Select
              options={Object.values(Frequency)}
              label="Frequency"
              placeholder="Enter habit frequency"
              {...field}
              disabled
            />
          )}
        />
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <InputForm
              label="Goal"
              placeholder="Enter habit goal"
              type="number"
              {...field}
              onChange={e => field.onChange(parseInt(e.target.value))}
            />
          )}
        />
        <DialogFooter>
          <Button>Save habit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
