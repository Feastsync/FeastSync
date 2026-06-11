import { z } from "zod";

export const vendorSignupSchema = z
  .object({
    stageName: z.string().min(5, "Stage name is required"),

    firstName: z.string().min(5, "First name is required"),

    lastName: z.string().min(5, "Last name is required"),

    phoneNumber: z.string().min(10, "Phone number is required"),

    email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );