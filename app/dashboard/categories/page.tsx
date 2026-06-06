import AddCategoryModal from '@/components/category/Modal/AddCategoryModal';
import CategoryTable from '@/components/category/Table/CategoryTable';
import PageHeader from '@/components/common/Header/PageHeader'
import { getCategoriesAction } from '@/lib/actions/category.actions';

const CategoriesPage = async () => {
    const response = await getCategoriesAction();

    const categories = response.data?.categories ?? [];

    return (
        <div className='space-y-4'>
            <PageHeader
                title="Categories"
                description="Organize and manage categories to structure your business data efficiently."
                others={<AddCategoryModal />}
            />
            <CategoryTable categories={categories} />
        </div>
    )
}

export default CategoriesPage