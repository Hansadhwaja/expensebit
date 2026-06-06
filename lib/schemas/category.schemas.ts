import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    color: z.string().min(1, "Please select any color"),
    icon: z.string().min(1, "Please select any icon"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;