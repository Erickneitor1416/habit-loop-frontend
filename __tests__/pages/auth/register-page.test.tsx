import RegisterPage from '@/app/auth/register/page';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe(RegisterPage, () => {
  it('should render', async () => {
    const page = render(<RegisterPage />);
    expect(page).toBeDefined();
  });
});
