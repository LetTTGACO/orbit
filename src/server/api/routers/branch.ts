import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  branchFormSchema,
  updateBranchFormSchema,
  type BranchColumn,
} from "@/lib/validators";
import { z } from "zod";
import { format } from "date-fns";

export const branchRouter = createTRPCRouter({
  getAll: protectedProcedure.mutation(async ({ ctx }) => {
    const branchList = await ctx.db.branch.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        builds: true,
        envs: true,
      },
    });

    const formattedBranch: BranchColumn[] = branchList.map((item) => {
      return {
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "yyyy/MM/dd HH:mm:ss"),
        updatedAt: format(item.updatedAt, "yyyy/MM/dd HH:mm:ss"),
        createdBy: ctx.session.user.name!,
      };
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
      const builds = input.builds?.map((buildId) => ({ id: buildId }));
      const envs = input.envs?.map((envId) => ({ id: envId }));
      return ctx.db.branch.create({
        data: {
          name: input.name,
          envs: { connect: envs },
          builds: { connect: builds },
          createdBy: { connect: { id: user.id } },
        },
      });
    }),
  update: protectedProcedure
    .input(updateBranchFormSchema)
    .mutation(async ({ ctx, input }) => {
      const builds = input.builds?.map((buildId) => ({ id: buildId }));
      const envs = input.envs?.map((envId) => ({ id: envId }));
      return ctx.db.branch.update({
        where: { id: input.id },
        data: {
          name: input.name,
          envs: { connect: envs },
          builds: { connect: builds },
        },
      });
    }),
});
