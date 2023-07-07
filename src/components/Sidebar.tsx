import Image from "next/image";
import Link from "next/link";

import { GoHomeFill } from "react-icons/go";
import { TbSquareRoundedPlus, TbHeart } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";

import { Url } from "next/dist/shared/lib/router/router";
import { IconType } from "react-icons";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";

type SidebarLinkProps = {
  href: Url;
  icon?: IconType;
  text: string;
  active?: boolean;
  renderImage?: () => ReactNode;
};

function SidebarLink({
  href,
  icon: Icon,
  text,
  active = false,
  renderImage,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-base ${
        active
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-500 dark:text-zinc-600"
      } w-full rounded-md px-4 py-2 font-medium transition-all duration-150 ease-in hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100`}
    >
      {Icon && <Icon size={24} />}
      {!Icon && renderImage && renderImage()}
      {text}
    </Link>
  );
}

export function Sidebar() {
  const router = useRouter();

  return (
    <nav className="top-0 hidden h-screen w-52 border-r border-zinc-300 px-4 py-6 dark:border-zinc-800 md:sticky md:block">
      <div className="mb-6 flex items-center gap-2 px-4 font-mono">
        <span className="font-mono text-4xl font-medium leading-none">@</span>
      </div>

      <ul className="flex flex-col items-start gap-2">
        <SidebarLink
          href="/"
          icon={GoHomeFill}
          text="Home"
          active={router.pathname === "/"}
        />
        <SidebarLink
          href="/search"
          icon={BiSearch}
          text="Search"
          active={router.pathname === "/search"}
        />
        <SidebarLink
          href="/create"
          icon={TbSquareRoundedPlus}
          text="Create"
          active={router.pathname === "/create"}
        />
        <SidebarLink
          href="/activities"
          icon={TbHeart}
          text="Activity"
          active={router.pathname === "/activities"}
        />
        <SidebarLink
          href="/profile"
          renderImage={() => (
            <Image
              className="h-[24px] w-[24px] rounded-full border border-zinc-600 object-cover"
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
              width={24}
              height={24}
              alt="Avatar"
            />
          )}
          text="Profile"
        />
      </ul>
    </nav>
  );
}
