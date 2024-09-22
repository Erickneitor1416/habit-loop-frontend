import { LoginUserUseCase } from '@/user/application';
import { LoginUser, User } from '@/user/domain';
import { userUseCaseFactory } from '@/user/factories';
import { loginHandle } from '@/user/infrastructure';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/user/domain', async () => {
  const actual = await vi.importActual('@/user/domain');
  return {
    ...actual,
    LoginUser: {
      safeParse: vi.fn(),
    },
  };
});

vi.mock('@/user/factories', () => ({
  userUseCaseFactory: {
    createUseCases: vi.fn(),
  },
}));

describe('loginHandle', () => {
  const mockExecute = vi.fn();
  const mockCreateUseCases = vi.fn(() => ({ execute: mockExecute }));

  beforeEach(() => {
    vi.clearAllMocks();
    (userUseCaseFactory.createUseCases as any).mockImplementation(
      mockCreateUseCases,
    );
  });

  it('should successfully authenticate a user', async () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockAuthenticatedUser = {
      user: { name: 'Test User', email: 'test@example.com' },
      accessToken: 'mock-token',
    };

    (LoginUser.safeParse as any).mockReturnValue({
      success: true,
      data: mockUser,
    });
    mockExecute.mockResolvedValue(mockAuthenticatedUser);

    const result = await loginHandle(mockUser);

    expect(LoginUser.safeParse).toHaveBeenCalledWith(mockUser);
    expect(userUseCaseFactory.createUseCases).toHaveBeenCalledWith(
      LoginUserUseCase,
    );
    expect(mockExecute).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({
      ...mockAuthenticatedUser.user,
      accessToken: 'mock-token',
      id: '',
    });
  });

  it('should throw an error if validation fails', async () => {
    const mockUser: User = { email: 'invalid-email', password: '123' };
    const mockError = new Error('Validation failed');

    (LoginUser.safeParse as any).mockReturnValue({
      success: false,
      error: mockError,
    });

    await expect(loginHandle(mockUser)).rejects.toThrow('Validation failed');
    expect(LoginUser.safeParse).toHaveBeenCalledWith(mockUser);
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it('should return null if authentication fails', async () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    (LoginUser.safeParse as any).mockReturnValue({
      success: true,
      data: mockUser,
    });
    mockExecute.mockResolvedValue(null);

    const result = await loginHandle(mockUser);

    expect(LoginUser.safeParse).toHaveBeenCalledWith(mockUser);
    expect(mockExecute).toHaveBeenCalledWith(mockUser);
    expect(result).toBeNull();
  });
});
