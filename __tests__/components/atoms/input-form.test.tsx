import { InputForm, InputFormProps } from '@/components';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

describe('InputForm', () => {
  const setup = (props: Partial<InputFormProps> = {}) => {
    const defaultProps: InputFormProps = {
      description: 'This is a description',
      label: 'Password',
      type: 'password',
      ...props,
    };
    const {
      result: { current: form },
    } = renderHook(() =>
      useForm<{ test: string }>({
        mode: 'onBlur',
        resolver: zodResolver(
          z.object({ test: z.string().min(2, 'Field cannot be empty') }),
        ),
        defaultValues: { test: '' },
      }),
    );

    render(
      <Form {...form}>
        <form>
          <FormField
            name="test"
            control={form.control}
            render={({ field }) => <InputForm {...defaultProps} {...field} />}
          />
        </form>
      </Form>,
    );
    const inputElement = screen.getByLabelText(defaultProps.label);
    return { inputElement };
  };

  it('renders the input with label and description', () => {
    setup();

    expect(screen.getByText('Password')).toBeDefined();
    expect(screen.getByText('This is a description')).toBeDefined();
  });

  it('toggles password visibility when the eye icon is clicked', () => {
    const { inputElement } = setup({ type: 'password' });

    const eyeIconButton = screen.getByRole('button');

    expect(inputElement).toHaveProperty('type', 'password');
    expect(screen.getByTestId('eye-icon')).toBeDefined();

    fireEvent.click(eyeIconButton);
    expect(inputElement).toHaveProperty('type', 'text');
    expect(screen.getByTestId('eye-off-icon')).toBeDefined();

    fireEvent.click(eyeIconButton);
    expect(inputElement).toHaveProperty('type', 'password');
    expect(screen.getByTestId('eye-icon')).toBeDefined();
  });

  it('does not render the eye icon if input type is not password', () => {
    setup({ type: 'text' });

    expect(screen.queryByRole('button')).not.toBeTruthy();
  });
});
