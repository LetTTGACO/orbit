import BreadCrumb from '@/app/components/breadcrumb';
import { BranchClient } from '@/app/components/tables/branch-tables/client';
import { api } from "@/trpc/server";

const breadcrumbItems = [{ title: '分支管理', link: '/branch' }];
export default async function page() {
  // 获取分支
  const branchList = await api.branch.getAll()

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <BranchClient data={branchList} />
      </div>
    </>
  );
}
