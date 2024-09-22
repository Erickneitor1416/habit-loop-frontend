import { Session } from '@/contexts';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mockear el SessionProvider
vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

describe('Session Component', () => {
  it('renders SessionProvider with children', () => {
    const { getByTestId, getByText } = render(
      <Session>
        <div>Test Child</div>
      </Session>,
    );

    expect(getByTestId('session-provider')).toBeDefined();
    expect(getByText('Test Child')).toBeDefined();
  });
});
