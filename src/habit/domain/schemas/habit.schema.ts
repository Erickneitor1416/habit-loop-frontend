import { Frequency } from '@/habit/domain';
import { z } from 'zod';

export const HabitSchema = z.object({
  name: z.string().min(1, 'Name is required').min(3, 'Name is too short'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(3, 'Description is too short'),
  frequency: z.nativeEnum(Frequency),
  goal: z
    .number()
    .int()
    .positive('Goal must be a positive number')
    .min(1, 'Goal is required'),
});
