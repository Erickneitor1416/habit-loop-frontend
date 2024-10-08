import LoadingPage from '@/app/loading';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe(LoadingPage, () => {
  it('should render', async () => {
    const page = render(<LoadingPage />);
    expect(page).toBeDefined();
  });
});
