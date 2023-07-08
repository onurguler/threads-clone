import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { Sidebar } from "~/components/Sidebar";

import "~/styles/globals.css";
import { Topbar } from "~/components/Topbar";
import { BottomBar } from "~/components/BottomBar";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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
        className={`flex flex-col items-start bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 md:flex-row min-h-screen`}
      >
        {session?.user ? (
          <>
            <Sidebar />
            <Topbar />
            <div className="relative min-h-screen flex-grow px-6 pt-16">
              <Component {...pageProps} />
            </div>
            <BottomBar />
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
