'use client';
import { Button } from '@/app/components/ui/button';
import { DataTable } from '@/app/components/ui/data-table';
import { Heading } from '@/app/components/ui/heading';
import { Separator } from '@/app/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import React from "react";
import { type BranchColumn } from "@/lib/validators";

interface ProductsClientProps {
  data: BranchColumn[];
  onRefresh?: () => void;
}

export const BranchClient: React.FC<ProductsClientProps> = ({ data, onRefresh }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="分支管理"
          description="分支的创建和编辑"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/branch/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} onRefresh={onRefresh} />
    </>
  );
};
