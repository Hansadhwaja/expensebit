"use client"

import { ControllerRenderProps, Path, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ExpenseFormValues, expenseSchema } from "@/lib/schemas/expense.schemas"

import { FormField } from "@/components/common/Form/FormField"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import Loader from "@/components/common/Loader/Loader"
import { categoryIcons, paymentMethods } from "@/constants"
import { Expense } from "@/lib/types/expense.types"
import { useMemo } from "react"
import { formatDateInput } from "@/lib/utils"
import { Category } from "@/lib/types/category.types"

type ExpenseField = {
  name: Path<ExpenseFormValues>
  label: string
  render: (
    field: ControllerRenderProps<ExpenseFormValues, Path<ExpenseFormValues>>
  ) => React.ReactNode
}

type FieldGroup = {
  className?: string
  fields: ExpenseField[]
}

interface Props {
  onSubmit: (v: ExpenseFormValues) => void
  isLoading: boolean
  initialData?: Expense
  categories: Category[]
}

const ExpenseForm = ({
  onSubmit,
  isLoading,
  initialData,
  categories,
}: Props) => {
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title ?? "",
      amount: initialData?.amount ?? 0,
      category: initialData?.category._id ?? "",
      paymentMethod: initialData?.paymentMethod ?? "cash",
      note: initialData?.note ?? "",
      date: initialData?.date
        ? formatDateInput(initialData?.date)
        : formatDateInput(new Date()),
      receiptImage: initialData?.receiptImage ?? "",
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = form

  const onFormSubmit = async (values: ExpenseFormValues) => {
    try {
      await onSubmit(values)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const fieldGroups: FieldGroup[] = useMemo(() => {
    return [
      {
        fields: [
          {
            name: "title",
            label: "Title",
            render: (field) => (
              <Input {...field} placeholder="Enter expense title" />
            ),
          },
        ],
      },
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
        fields: [
          {
            name: "date",
            label: "Date",
            render: (field) => <Input {...field} type="date" />,
          },
          {
            name: "amount",
            label: "Amount",
            render: (field) => (
              <Input
                type="number"
                value={field.value}
                placeholder="Enter amount"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            ),
          },
          {
            name: "category",
            label: "Category",
            render: (field) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((c) => {
                    const Icon = categoryIcons.find(
                      (cat) => cat.value == c.icon
                    )
                    if (!Icon) return

                    return (
                      <SelectItem key={c._id} value={c._id}>
                        <Icon.icon />
                        {c.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            ),
          },
          {
            name: "paymentMethod",
            label: "Payment Method",
            render: (field) => (
              <Select
                value={field.value as string}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>

                <SelectContent>
                  {paymentMethods.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      <m.icon />
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          },
        ],
      },
      {
        fields: [
          {
            name: "receiptImage",
            label: "Receipt Image",
            render: (field) => <Input {...field} placeholder="Image URL" />,
          },
        ],
      },
      {
        fields: [
          {
            name: "note",
            label: "Note",
            render: (field) => <Textarea {...field} placeholder="Enter note" />,
          },
        ],
      },
    ]
  }, [categories])

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {fieldGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={group.className}>
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
      ))}

      <Button type="submit" disabled={!isValid || isLoading} className="w-full">
        {isLoading ? <Loader /> : "Submit"}
      </Button>
    </form>
  )
}

export default ExpenseForm
