import Image from "next/image";
import Link from "next/link";

import { GoHomeFill } from "react-icons/go";
import { TbSquareRoundedPlus, TbHeart, TbLogout } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";

import { Url } from "next/dist/shared/lib/router/router";
import { IconType } from "react-icons";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

type SidebarLinkProps = {
  href?: Url;
  icon?: IconType;
  text: string;
  active?: boolean;
  renderImage?: () => ReactNode;
  onClick?: () => void;
  iconClassName?: string;
};

function SidebarLink({
  href = "#",
  icon: Icon,
  active = false,
  text,
  renderImage,
  onClick,
  iconClassName = "",
}: SidebarLinkProps) {
  return (
    <Link
      title={text}
      onClick={() => onClick && onClick()}
      href={href}
      className={`flex items-center gap-2 text-base ${
        active
          ? "text-zinc-900 dark:text-zinc-50"
          : "text-zinc-500 dark:text-zinc-600"
      } rounded-md px-4 py-2 font-medium transition-all duration-150 ease-in hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50`}
    >
      {Icon && <Icon size={24} className={iconClassName} />}
      {!Icon && renderImage && renderImage()}
    </Link>
  );
}

export function Topbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/auth/sign-in",
    });
  };

  return (
    <div className="sticky top-0 flex w-full flex-col items-center justify-center gap-2 bg-zinc-50 px-4 py-2 text-center font-mono dark:border-zinc-800 dark:bg-zinc-950 md:flex-row md:items-start md:justify-between">
      <span className="font-mono text-4xl font-medium leading-none">@</span>

      <ul className="flex w-full items-center justify-around gap-2 md:justify-end">
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
        <SidebarLink
          iconClassName="text-red-500"
          icon={TbLogout}
          text="Sign Out"
          onClick={handleSignOut}
        />
      </ul>
    </div>
  );
}
