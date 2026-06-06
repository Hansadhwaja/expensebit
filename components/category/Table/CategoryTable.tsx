import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { Category } from '@/lib/types/category.types'

interface Props {
    categories: Category[];
}

const CategoryTable = ({ categories = [] }: Props) => {
    return (
        <div>
            <DataTable columns={columns} data={categories} />
        </div>
    )
}

export default CategoryTable