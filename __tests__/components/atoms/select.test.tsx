import { Select } from '@/components';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { act, render, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

describe('Select', () => {
  const onChange = vi.fn();
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
  const setup = () => {
    return render(
      <Form {...form}>
        <Select
          options={['testOption']}
          placeholder="test"
          label="test"
          onChange={onChange}
          value="test"
        />
      </Form>,
    );
  };
  it('should render', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });
  it('should render the label', () => {
    const component = setup();
    expect(component.getByText('test')).toBeDefined();
  });
  it('should render the placeholder', () => {
    const component = setup();
    expect(component.getByText('test')).toBeDefined();
  });
  it('should render the options', () => {
    const component = setup();
    act(() => {
      component.getByRole('combobox').click();
    });
    expect(component.getByText('testOption')).toBeDefined();
  });
  it('should call onChange when an option is selected', () => {
    const component = setup();
    act(() => {
      component.getByRole('combobox').click();
    });
    act(() => {
      component.getByText('testOption').click();
    });
    expect(onChange).toHaveBeenCalled();
  });
});
