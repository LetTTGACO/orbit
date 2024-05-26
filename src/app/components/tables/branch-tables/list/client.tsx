"use client";
import { Button } from "@/app/components/ui/button";
import { DataTable } from "@/app/components/ui/data-table";
import { Heading } from "@/app/components/ui/heading";
import { Separator } from "@/app/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import React, { useState } from "react";
import { type BranchColumn } from "@/lib/validators";
import { api } from "@/trpc/react";

interface ProductsClientProps {
  data: BranchColumn[];
}

export const BranchClient: React.FC<ProductsClientProps> = ({ data }) => {
  const [branchList, setBranchList] = useState<BranchColumn[]>(data);

  const router = useRouter();
  const mutation = api.branch.getAll.useMutation()
  const loading = true
  // const loading = !mutation.isSuccess

  const handleRefresh = async () => {

    const newBranchList = await mutation.mutateAsync()
    console.log('newBranchList', newBranchList);
    setBranchList(newBranchList);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="分支管理" description="分支的创建和编辑" />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/branch/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> 新增分支
        </Button>
      </div>
      <Separator />
      <DataTable
        loading={loading}
        searchKey="name"
        columns={columns}
        data={branchList}
        onRefresh={handleRefresh}
      />
    </>
  );
};
