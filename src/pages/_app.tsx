import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import Head from "next/head";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import { Topbar } from "~/components/Topbar";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Threads</title>
        <meta
          name="description"
          content="Threads clone application by @onurguler"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`relative flex h-screen flex-col items-start bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 md:flex-row`}
      >
        {!router.pathname.startsWith("/auth") ? (
          <main className="container mx-auto max-w-2xl">
            <Topbar />
            <div className="flex h-full flex-col p-6">
              <Component {...pageProps} />
            </div>
          </main>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
