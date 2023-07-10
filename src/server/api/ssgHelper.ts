import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "./root";
import { createInnerTRPCContext } from "./trpc";
import { getServerAuthSession } from "../auth";
import { GetServerSidePropsContext } from "next";

export async function ssgHelper(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: superjson,
  });
}
