import { z } from "zod";

export const branchFormSchema = z.object({
  name: z.string().min(1),
  builds: z.optional(z.string().array()),
  envs: z.optional(z.string().array()),
});

export type BranchFromValues = z.infer<typeof branchFormSchema>;

export const branchColumn = z.object({
  id: z.string(),
  name: z.string().min(1, { message: '分支名称必填' }),
  // TODO 改成 build 对象
  builds: z.optional(z.string().array()),
  // TODO 改成 env 对象
  envs: z.optional(z.array(z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  }))),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string()
});

export type BranchColumn = z.infer<typeof branchColumn>;

export const updateBranchFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  builds: z.optional(z.string().array()),
  envs: z.optional(z.string().array()),
});
