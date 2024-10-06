import { Signature } from '@/components';
import { act, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Signature', () => {
  it('should render', () => {
    const signature = render(<Signature />);
    expect(signature).toBeTruthy();
  });
  it('should render the title', () => {
    const signature = render(<Signature />);
    expect(signature.getByText('Habit Loop app')).toBeDefined();
  });
  it('should render the author', () => {
    const signature = render(<Signature />);
    expect(signature.getByText('by Erick Muñoz')).toBeDefined();
  });
  it('should render the mode toggle', () => {
    const signature = render(<Signature />);
    expect(signature.getByRole('button')).toBeDefined();
  });
  it('should redirect when the name is clicked', () => {
    const signature = render(<Signature />);
    act(() => {
      signature.getByText('Habit Loop app').click();
    });
    expect(window.location.pathname).toBe('/');
  });
});
