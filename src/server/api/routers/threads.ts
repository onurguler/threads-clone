import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
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

  getUserThreads: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      const { username } = input;
      const user = await ctx.prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      const isItself =
        ctx.session?.user && ctx.session?.user?.name === username;

      // if (user.isPrivateAccount) {
      //   if (ctx.session?.user && ctx.session?.user?.name !== username) {
      //     // check current user is following this user
      //   }
      //   // check current user is following this user
      //   throw new TRPCError({
      //     code: "FORBIDDEN",
      //     message: "This account is private.",
      //   });
      // }

      const threads = await ctx.prisma.thread.findMany({
        where: {
          authorId: user.id,
        },
        select: {
          id: true,
          bodyText: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: 200,
        message: "Threads fetched successfully.",
        result: threads.map((thread) => ({
          ...thread,
          author: {
            ...thread.author,
            avatar:
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          },
        })),
      };
    }),

  like: protectedProcedure
    .input(z.object({ threadId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { threadId } = input;

      const thread = await ctx.prisma.thread.findFirst({
        where: {
          id: threadId,
        },
      });

      if (!thread) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Thread not found.",
        });
      }

      const existingLike = await ctx.prisma.like.findFirst({
        where: {
          postId: threadId,
          userId: ctx.session.user.id,
        },
      });

      if (existingLike) {
        await ctx.prisma.like.delete({
          where: {
            postId_userId: {
              postId: threadId,
              userId: ctx.session.user.id,
            },
          },
        });

        return {
          status: 200,
          message: "Like removed successfully.",
          result: {
            liked: false,
          },
        };
      }

      await ctx.prisma.like.create({
        data: {
          postId: threadId,
          userId: ctx.session.user.id,
        },
      });

      return {
        status: 200,
        message: "Like added successfully.",
        result: {
          liked: true,
        },
      };
    }),
});
