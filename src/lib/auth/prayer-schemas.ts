import { z } from 'zod';

// Prayer request schema
export const prayerRequestSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .trim()
    .toLowerCase(),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .trim(),
  prayerRequest: z.string()
    .min(10, 'Prayer request must be at least 10 characters')
    .max(2000, 'Prayer request must be less than 2000 characters')
    .trim(),
});

// Types
export type PrayerRequestData = z.infer<typeof prayerRequestSchema>;
