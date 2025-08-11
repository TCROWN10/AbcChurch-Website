import { z } from "zod";

export const prayerRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .email("Please provide a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject must be at most 120 characters"),
  prayerRequest: z
    .string()
    .min(10, "Prayer request must be at least 10 characters")
    .max(2000, "Prayer request must be at most 2000 characters"),
});
