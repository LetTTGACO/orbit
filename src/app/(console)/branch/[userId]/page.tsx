import BreadCrumb from '@/app/components/breadcrumb';
// import { ProductForm } from '@/app/components/forms/product-form';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import React from 'react';
import { api } from "@/trpc/server";
import { BranchForm } from "@/app/components/forms/branch-form/client";

export default function Page() {
  const breadcrumbItems = [
    { title: '分支管理', link: '/branch' },
    { title: '详情', link: '/branch/detail' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        详情

        {/*<ProductForm*/}
        {/*  categories={[*/}
        {/*    { _id: 'shirts', name: 'shirts' },*/}
        {/*    { _id: 'pants', name: 'pants' }*/}
        {/*  ]}*/}
        {/*  initialData={null}*/}
        {/*  key={null}*/}
        {/*/>*/}
      </div>
    </ScrollArea>
  );
}
