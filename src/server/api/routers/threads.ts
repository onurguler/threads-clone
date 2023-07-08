import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { newThreadSchema } from "~/utils/validations/threads";

export const threadsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newThreadSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.thread.create({
        data: {
          bodyText: input.bodyText,
          authorId: ctx.session.user.id,
        },
      });

      return {
        status: 201,
        message: "Thread created successfully.",
        result,
      };
    }),
});
