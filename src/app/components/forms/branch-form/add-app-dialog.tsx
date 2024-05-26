'use client';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components/ui/dialog';
import React from "react";
import { Plus } from "lucide-react";
import MultipleSelector from "@/app/components/ui/multi-select";
// import { useTaskStore } from "@/hooks/useApp";


export default function AddAppDialog() {
  // const addCol = useTaskStore((state) => state.addCol);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title } = Object.fromEntries(formData);

    if (typeof title !== 'string') return;
    // addCol(title);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="text-xs md:text-sm">
          <Plus className="mr-2 h-4 w-4" /> 新增应用
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增应用</DialogTitle>
          <DialogDescription>
            选择要关联的应用
          </DialogDescription>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <MultipleSelector
            defaultOptions={[
              { label: "dev", value: "aaaa" },
              { label: "test", value: "bbb" },
              { label: "dev1", value: "aaaa1" },
              { label: "test1", value: "bbb1" },
            ]}
            placeholder="选择应用"
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                没有更多数据
              </p>
            }
          />
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              Add Section
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
