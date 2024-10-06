import { DropDownMenuLogOut } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { render } from '@testing-library/react';
import { signOut } from 'next-auth/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-auth/react', () => ({
  signOut: vi.fn(),
}));

describe('DropDownMenuLogOut', () => {
  const setup = () => {
    return render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropDownMenuLogOut />
        </DropdownMenuContent>
      </DropdownMenu>,
    );
  };

  it('should render', () => {
    const component = setup();
    expect(component).toBeDefined();
  });
  it('should render the log out button', () => {
    const component = setup();
    expect(component.getByText('Log out')).toBeDefined();
  });
  it('should call signOut when the log out button is clicked', () => {
    const component = setup();
    component.getByText('Log out').click();
    expect(signOut).toHaveBeenCalled();
  });
});
