import { CategoryFormValues, categorySchema } from "../schemas/category.schemas";


export function validateCategory(data: CategoryFormValues) {
    return categorySchema.safeParse(data);
}