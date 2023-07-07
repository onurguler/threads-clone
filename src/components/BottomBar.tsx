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
  active?: boolean;
  renderImage?: () => ReactNode;
};

function SidebarLink({
  href,
  icon: Icon,
  active = false,
  renderImage,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 text-base ${
        active
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-500 dark:text-zinc-600"
      } w-full rounded-md px-4 py-2 font-medium transition-all duration-150 ease-in hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100`}
    >
      {Icon && <Icon size={24} />}
      {!Icon && renderImage && renderImage()}
    </Link>
  );
}
export function BottomBar() {
  const router = useRouter();

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-zinc-100 border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 px-4 py-2">
      <ul className="flex flex-row items-center justify-between gap-2">
        <SidebarLink
          href="/"
          icon={GoHomeFill}
          active={router.pathname === "/"}
        />
        <SidebarLink
          href="/search"
          icon={BiSearch}
          active={router.pathname === "/search"}
        />
        <SidebarLink
          href="/create"
          icon={TbSquareRoundedPlus}
          active={router.pathname === "/create"}
        />
        <SidebarLink
          href="/activities"
          icon={TbHeart}
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
        />
      </ul>
    </div>
  );
}
