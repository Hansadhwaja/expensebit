"use client";

import {
    ControllerRenderProps,
    Path,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    CategoryFormValues,
    categorySchema,
} from "@/lib/schemas/category.schemas";

import { FormField } from "@/components/common/Form/FormField";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader/Loader";
import { categories, categoryColors, categoryIcons, paymentMethods } from "@/constants";
import { Category } from "@/lib/types/category.types";
import { useMemo } from "react";

type CategoryField = {
    name: Path<CategoryFormValues>;
    label: string;
    render: (
        field: ControllerRenderProps<
            CategoryFormValues,
            Path<CategoryFormValues>
        >
    ) => React.ReactNode;
};

type FieldGroup = {
    className?: string;
    fields: CategoryField[];
};

interface Props {
    onSubmit: (v: CategoryFormValues) => void;
    isLoading: boolean;
    initialData?: Category;
}

const CategoryForm = ({
    onSubmit,
    isLoading,
    initialData
}: Props) => {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        mode: "onChange",
        defaultValues: {
            name: initialData?.name ?? "",
            color: initialData?.color ?? "",
            icon: initialData?.icon ?? "",
        },
    });

    const { control, handleSubmit, reset, formState: { isValid } } = form;

    const onFormSubmit = async (values: CategoryFormValues) => {
        try {
            await onSubmit(values);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const fieldGroups: FieldGroup[] = useMemo(() => {
        return [
            {
                fields: [
                    {
                        name: "name",
                        label: "Name",
                        render: (field) => (
                            <Input
                                {...field}
                                placeholder="Enter Category name"
                            />
                        ),
                    }
                ],
            },
            {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                fields: [
                    {
                        name: "color",
                        label: "Color",
                        render: (field) => (
                            <Select
                                value={field.value as string}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select color" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categoryColors.map((c) => (
                                        <SelectItem key={c.value} value={c.value}>
                                            <div className={`w-3 h-3 rounded-full ${c.class}`} />
                                            {c.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ),
                    },
                    {
                        name: "icon",
                        label: "Icon",
                        render: (field) => (
                            <Select
                                value={field.value as string}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Icon" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categoryIcons.map((i) => (
                                        <SelectItem key={i.value} value={i.value}>
                                            <i.icon className="w-4 h-4 mr-2" />
                                            {i.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ),
                    },
                ],
            },
        ]
    }, []);


    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="space-y-4"
        >
            {fieldGroups.map(
                (group, groupIndex) => (
                    <div
                        key={groupIndex}
                        className={group.className}
                    >
                        {group.fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={control}
                                name={field.name}
                                label={field.label}
                                render={field.render}
                            />
                        ))}
                    </div>
                )
            )}

            <Button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full"
            >
                {isLoading ? <Loader /> : "Submit"}
            </Button>
        </form>
    );
};

export default CategoryForm;