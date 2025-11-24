import z from "zod";

export const UserCreateSchema = z.object({
  firstName: z.string().min(2, "First name must have at least 2 characters"),
  lastName: z.string().min(2, "Last name must have at least 2 characters"),
  email: z.email(),
  confirmEmail: z.email(),
  password: z.string().min(3, "Password must have at least 3 characters"),
  confirmPassword: z.string(),
}).refine(data => data.email === data.confirmEmail, {
  message: "Emails must match",
  path: ["confirmEmail"]
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
});

export type UserCreateDTO = z.infer<typeof UserCreateSchema>;