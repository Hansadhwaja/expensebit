import PageHeaderSkeleton from "@/components/common/Header/Skeleton/PageHeaderSkeleton";
import ExpenseTableSkeleton from "@/components/expense/Table/Skeleton/ExpenseTableSkeleton";


export default function Loading() {
  return (
    <div className="space-y-4">
      <PageHeaderSkeleton />
      <ExpenseTableSkeleton />
    </div>
  );
}