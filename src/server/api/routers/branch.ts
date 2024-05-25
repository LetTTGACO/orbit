import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { branchFormSchema, updateBranchFormSchema, type BranchColumn } from "@/lib/validators";
import { z } from "zod";
import { format } from "date-fns";

export const branchRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const branchList = await ctx.db.branch.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedBranch: BranchColumn[] = branchList.map((item) => {
      return {
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "yyyy/MM/dd"),
        updatedAt: format(item.updatedAt, "yyyy/MM/dd"),
        createdBy: ctx.session.user.name!
      }
    });
    return formattedBranch;
  }),
  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.branch.findUnique({
        where: { id: input },
      });
    }),
  create: protectedProcedure
    .input(branchFormSchema)
    .mutation(async ({ ctx, input }) => {
      // return ctx.db.branch.create({ data: { ...input } });
      const user = ctx.session.user;
      const apps = input.apps?.map((appId) => ({ id: appId }));
      return ctx.db.branch.create({
        data: { name: input.name, apps: { connect: apps },  createdBy: { connect: { id: user.id } } },
      });
    }),
  update: protectedProcedure
    .input(updateBranchFormSchema)
    .mutation(async ({ ctx, input }) => {
      const apps = input.apps?.map((appId) => ({ id: appId }));
      return ctx.db.branch.update({
        where: { id: input.id },
        data: { name: input.name, apps: { connect: apps } },
      });
    }),
});
