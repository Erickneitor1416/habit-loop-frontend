import { ToggleModeMenuItem } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ToggleModeMenuItem', () => {
  const setup = () => {
    return render(
      <DropdownMenu open>
        <DropdownMenuContent className="w-56 mr-2">
          <ToggleModeMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>,
    );
  };
  it('should render the component', () => {
    const toggle = setup();
    expect(toggle).toBeDefined();
  });
});
