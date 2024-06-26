import * as z from "zod";

export const authSchema = z.object({
  firstName: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  lastName: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  emailAddress: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),

  phoneNumber: z.string(),
  storeId: z.number().optional(),
  roleId: z.number(),
  address: z.string(),
});

export const authLogin = z.object({
  emailAddress: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const checkEmailSchema = z.object({
  email: authSchema.shape.emailAddress,
});

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verfifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const customerSchema = z.object({
  firstname: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  lastname: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  fullname: z.string().optional(),
  gender: z.string(),
  emailAddress: z.string().email({
    message: "Please enter a valid email address",
  }),
  mobileNumber: z.string(),
  storeId: z.number().optional(),
  roleId: z.number(),
  address: z.string(),
  postCode: z.string(),
  medicalHistory: z.string(),
  allergy: z.string(),
  dateOfBirth: z.string(),
});
