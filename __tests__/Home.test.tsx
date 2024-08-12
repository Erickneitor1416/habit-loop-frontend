import Home from '@/app/page';
import { render, within } from '@testing-library/react';
import { expect, test } from 'vitest';

test(Home, () => {
  const { getByRole } = render(<Home />);
  const main = within(getByRole('main'));
  expect(
    main.getByRole('heading', { level: 1, name: /Habit Loop app/i }),
  ).toBeDefined();

  expect(getByRole('img', { name: /Logo/i })).toBeDefined();
});
