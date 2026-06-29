import { z } from "zod";

export const vendorSignupSchema = z
  .object({
    stageName: z.string().min(2, "Stage name must be at least 2 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email")
      .refine((val) => val.toLowerCase().includes(".com"), {
        message: "Email must contain.com",
      }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/(?=.*[a-z])/, "Password must contain lowercase")
      .regex(/(?=.*[A-Z])/, "Password must contain uppercase")
      .regex(/(?=.*\d)/, "Password must contain number")
      .regex(/(?=.*[^A-Za-z0-9])/, "Password must contain special character"), // any special char

    confirmPassword: z.string().min(1, "confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });