'use client';
import { InputForm, Select } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export function CreateHabitForm() {
  const form = useForm<{
    field1: string;
    field2: string;
    field3: string;
    field4: string;
  }>();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="field1"
          render={({ field }) => (
            <InputForm label="Name" placeholder="Enter habit name" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="field2"
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
          name="field3"
          render={({ field }) => (
            <Select
              options={['option1']}
              label="Frequency"
              placeholder="Enter habit frequency"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="field4"
          render={({ field }) => (
            <InputForm
              label="Goals"
              placeholder="Enter habit goals"
              {...field}
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
