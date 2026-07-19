import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long.")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(250, "Address cannot exceed 250 characters.")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .max(100, "City cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  state: z
    .string()
    .trim()
    .max(100, "State cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .max(100, "Country cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  postalCode: z
    .string()
    .trim()
    .max(20, "Postal code cannot exceed 20 characters.")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export const defaultCustomerValues: CustomerFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  notes: "",
};