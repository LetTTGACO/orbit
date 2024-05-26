"use client";

import { columns } from "./columns";
import React from "react";
import { type BranchColumn } from "@/lib/validators";
import { BranchDetailTable } from "./table";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import AddAppDialog from "@/app/components/forms/branch-form/add-app-dialog";

interface ProductsClientProps {
  data: BranchColumn[];
  onAdd?: () => void;
}

export const BranchDetailTableClient: React.FC<ProductsClientProps> = ({
  data,
  onAdd,
}) => {
  return (
    <>
      <div className="flex items-start justify-between pb-2">
        <Button className="text-xs md:text-sm">批量操作</Button>
        <AddAppDialog/>
      </div>
      <Separator />
      <BranchDetailTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
