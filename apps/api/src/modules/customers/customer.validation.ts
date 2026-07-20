import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(7)
    .max(20),

  address: z
    .string()
    .trim()
    .max(300)
    .optional(),

  city: z
    .string()
    .trim()
    .max(100)
    .optional(),

  state: z
    .string()
    .trim()
    .max(100)
    .optional(),

  country: z
    .string()
    .trim()
    .max(100)
    .optional(),

  postalCode: z
    .string()
    .trim()
    .max(20)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(1000)
    .optional(),
});

export const updateCustomerSchema =
  createCustomerSchema.partial();

export const customerQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(1000).default(10),

  search: z.string().trim().optional(),
});

export type CreateCustomerDto =
  z.infer<typeof createCustomerSchema>;

export type UpdateCustomerDto =
  z.infer<typeof updateCustomerSchema>;

export type CustomerQueryDto =
  z.infer<typeof customerQuerySchema>;