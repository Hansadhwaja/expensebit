"use server";

import { CategoryFormValues } from "@/lib/schemas/category.schemas";
import { ActionResponse } from "@/lib/types";
import { validateCategory } from "../validators/category.validators";
import { createCategoryService, deleteCategoryService, editCategoryService, getCategoriesService } from "../services/category.services";
import { USER } from "@/constants";
import { Category } from "@/lib/types/category.types";
import { revalidatePath } from "next/cache";

export async function addCategoryAction(
    data: CategoryFormValues
): Promise<ActionResponse<{ id: string }>> {
    try {

        const userId = USER.id;

        const validatedData = validateCategory(data);

        if (!validatedData.success) {
            return {
                success: false,
                message: validatedData.error.issues[0]?.message ?? "Invalid form data"
            }
        }

        const { id } = await createCategoryService({
            ...validatedData.data,
            userId
        });

        revalidatePath("/dashboard/categories");

        return {
            success: true,
            message: 'Category Created Successfully',
            data: { id }
        }


    } catch (error) {
        console.log("[ADD_CATEGORY_ACTION]", error);
        return {
            success: false,
            message: "Failed to create Category",
        }
    }
}

export async function getCategoriesAction(): Promise<ActionResponse<{ categories: Category[] }>> {
    try {
        const categories = await getCategoriesService();

        return {
            success: true,
            message: 'Categories Fetched Successfully',
            data: { categories }
        }
    } catch (error) {
        console.log("[GET_CATEGORIES_ACTION]", error);
        return {
            success: false,
            message: 'Error while fetching all Categories'
        }
    }
}

export async function editCategoryAction({
    data,
    categoryId
}: {
    data: CategoryFormValues,
    categoryId: string
}): Promise<ActionResponse<void>> {
    try {

        const userId = USER.id;

        const validatedData = validateCategory(data);

        if (!validatedData.success) {
            return {
                success: false,
                message: validatedData.error.issues[0]?.message ?? "Invalid form data"
            }
        }

        await editCategoryService({
            categoryId,
            data: {
                ...validatedData.data,
                userId,

            }
        });

        revalidatePath("/dashboard/categories");

        return {
            success: true,
            message: 'Category Edited Successfully',
        }


    } catch (error) {
        console.log("[EDIT_CATEGORY_ACTION]", error);
        return {
            success: false,
            message: "Failed to edit Category",
        }
    }
}

export async function deleteCategoryAction(
    categoryId: string
): Promise<ActionResponse<void>> {
    try {

        await deleteCategoryService(categoryId);

        revalidatePath("/dashboard/categories");

        return {
            success: true,
            message: 'Category Deleted Successfully',
        }


    } catch (error) {
        console.log("[DELETE_CATEGORY_ACTION]", error);
        return {
            success: false,
            message: "Failed to delete Category",
        }
    }
}