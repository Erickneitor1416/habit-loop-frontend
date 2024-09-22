import RegisterPage from '@/app/auth/register/page';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe(RegisterPage, () => {
  it('should render', async () => {
    const page = render(<RegisterPage />);
    expect(page).toBeDefined();
  });
});
