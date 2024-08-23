import { z } from 'zod';

export const RegisterUser = z.object({
  email: z.string().trim().email('Invalid email address'),
  name: z.string().trim().min(3, 'Name is too short'),
  password: z
    .string()
    .min(12, 'Password is too short')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
});
