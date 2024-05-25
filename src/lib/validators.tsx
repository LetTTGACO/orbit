import { z } from "zod";

export const branchFormSchema = z.object({
  name: z.string().min(1),
  apps: z.optional(z.string().array()),
});

export type BranchFromValues = z.infer<typeof branchFormSchema>;

export const branchColumn = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string()
});

export type BranchColumn = z.infer<typeof branchColumn>;

export const updateBranchFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  apps: z.optional(z.string().array()),
});
