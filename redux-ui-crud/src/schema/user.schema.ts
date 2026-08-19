import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(5, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .min(7, "Phone must be at least 7 characters"),
});

export type UserFormData = z.infer<typeof userSchema>;
