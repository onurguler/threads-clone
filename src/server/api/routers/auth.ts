import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

import { signupSchema } from "~/utils/validations/auth";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, email, username, password } = input;

      const emailExists = await ctx.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (emailExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A user with this email already exists.",
        });
      }

      const userNameExists = await ctx.prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (userNameExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A user with this username already exists.",
        });
      }

      const passwordHash = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          name,
          email,
          username,
          passwordHash,
        },
      });

      return {
        status: 201,
        message: "Account created successfully.",
        result: result.username,
      };
    }),
});
