"use client";

import React, { type FC, useState } from "react";
import { type BranchColumn, branchFormSchema } from "@/lib/validators";
import { Heading } from "@/app/components/ui/heading";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Plus, Trash } from "lucide-react";
import { AlertModal } from "@/app/components/modal/alert-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import MultipleSelector from "@/app/components/ui/multi-select";
import { BranchDetailTableClient } from "@/app/components/tables/branch-tables/detail/client";

interface BranchFormProps {
  initialData: BranchColumn | null;
}

export const BranchForm: FC<BranchFormProps> = ({ initialData }) => {
  const title = initialData ? "编辑分支" : "创建分支";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([]);

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
      };

  const form = useForm<BranchColumn>({
    resolver: zodResolver(branchFormSchema),
    defaultValues,
  });

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      // router.refresh();
      // router.push(`/${params.storeId}/products`);
    } catch (error) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onSubmit = async () => {
    // 校验表单
    await form.trigger().then((res) => {
      if (res) {
        console.log("res", res);
        const data = form.getValues();
        console.log("data", data);
        try {
          setLoading(true);
          if (initialData) {
            // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
          } else {
            // const res = await axios.post(`/api/products/create-product`, data);
            // console.log("product", res);
          }
          // router.refresh();
          // router.push(`/dashboard/products`);
          // toast({
          //   variant: 'destructive',
          //   title: 'Uh oh! Something went wrong.',
          //   description: 'There was a problem with your request.'
          // });
        } catch (error) {
          // toast({
          //   variant: 'destructive',
          //   title: 'Uh oh! Something went wrong.',
          //   description: 'There was a problem with your request.'
          // });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  /**
   * 新增应用
   */
  const handleAdd = () => {
    console.log("123", 123);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description="" />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
        <Button
          disabled={loading}
          className="ml-auto"
          onClick={() => onSubmit()}
        >
          保存
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-2xl font-medium">基本信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gap-8 md:grid md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>分支名称</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="分支名称"
                          className="w-1/2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="envs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>环境</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={[
                            { label: "dev", value: "aaaa" },
                            { label: "test", value: "bbb" },
                            { label: "dev1", value: "aaaa1" },
                            { label: "test1", value: "bbb1" },
                          ]}
                          placeholder="选择环境"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              没有更多数据
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-2xl font-medium">应用信息</CardTitle>
        </CardHeader>
        <CardContent>
          <BranchDetailTableClient data={apps} onAdd={handleAdd} />
        </CardContent>
      </Card>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
    </>
  );
};
