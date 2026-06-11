"use server";

import connectDB from "../db";
import Category from "../models/Category.model";
import { CategoryFormValues } from "../schemas/category.schemas";
import { Category as CategoryType } from "@/lib/types/category.types";


export async function createCategoryService(
    data: CategoryFormValues & { userId: string }
): Promise<{ id: string }> {
    try {

        await connectDB();
        const category = await Category.create(data);
        if (!Category) {
            throw new Error("Error creating Category")
        }

        return {
            id: category._id.toString(),
        };
    } catch (error) {
        console.log("[CREATE_CATEGORY_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : "Error creating Category")
    }
}

export async function getCategoriesService(): Promise<CategoryType[]> {
    try {
        await connectDB();
        const categories = await Category
            .find({})
            .sort({ date: -1 })
            .lean();

        if (!categories) {
            throw new Error("Failed to fetch Categories");
        }

        return categories.map(c => ({
            ...c,
            _id: c._id.toString(),
        }))


    } catch (error) {
        console.log("[GET_CATEGORIES_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : 'Error while fetching all Categories')
    }
}

export async function editCategoryService({
    data,
    categoryId
}: {
    data: CategoryFormValues & { userId: string },
    categoryId: string
}): Promise<void> {
    try {

        await connectDB();
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
            new: true,
            runValidators: true
        });
        if (!updatedCategory) {
            throw new Error("Category Not Found")
        }
    } catch (error) {
        console.log("[EDIT_CATEGORY_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : "Error while editing Category")
    }
}

export async function deleteCategoryService(
    categoryId: string
): Promise<void> {
    try {
        await connectDB();
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw new Error("Category Not Found")
        }
    } catch (error) {
        console.log("[DELETE_CATEGORY_SERVICE]", error);
        throw new Error(error instanceof Error ? error.message : "Error while deleting Category")
    }
}

export async function getTotalCategories(): Promise<number> {
    await connectDB();

    return await Category.countDocuments();
}