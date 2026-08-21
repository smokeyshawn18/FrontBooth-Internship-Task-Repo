import { z } from "zod";

// Single source of truth: the Zod schema defines both the runtime validation
// rules AND the TypeScript type. No more hand-writing ProductFormValues
// separately from the validation logic.
export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .min(0, "Price cannot be negative"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export interface Product extends ProductFormValues {
  id: string;
}
