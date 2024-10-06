import { Loading } from '@/components';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('LoaderSpinner', () => {
  it('should render', () => {
    const component = render(<Loading />);
    expect(component).toBeDefined();
  });
  it('should render the title', () => {
    const component = render(<Loading />);
    expect(component.getByText('Habit Loop')).toBeDefined();
  });
  it('should not render the title', () => {
    const component = render(<Loading withTitle={false} />);
    expect(component.queryByText('Habit Loop')).toBeNull();
  });
});
