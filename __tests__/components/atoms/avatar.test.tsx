import { Avatar } from '@/components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe(Avatar, () => {
  it('should render', () => {
    const component = render(<Avatar name="testName" />);
    expect(component).toBeDefined();
  });
  it('should render the avatar with the given name', () => {
    render(<Avatar name="Shad" />);
    expect(screen.getByText('Shad')).toBeDefined();
  });
});
