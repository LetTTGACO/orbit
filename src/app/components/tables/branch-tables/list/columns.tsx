"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/app/components/ui/checkbox";
import { type BranchColumn } from "@/lib/validators";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<BranchColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "分支名称",
    cell: ({ row }) => (
      <Button variant="link">
        <Link href={`/branch/${row.original.id}`}>{row.original.name}</Link>
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "创建时间",
  },
  {
    accessorKey: "updatedAt",
    header: "更新时间",
  },
  {
    accessorKey: "createdBy",
    header: "创建人",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
