import Dashboard from '@/app/dashboard/page';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/molecules', async importOriginal => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    DropdownProfileMenu: () => <div>DropdownProfileMenu</div>,
  };
});

describe(Dashboard, () => {
  it('should render', async () => {
    const page = render(<Dashboard />);
    expect(page).toBeDefined();
  });
});
