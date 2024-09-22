import LoginPage from '@/app/auth/login/page';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe(LoginPage, () => {
  it('should render', async () => {
    const page = render(<LoginPage />);
    expect(page).toBeDefined();
  });
});
