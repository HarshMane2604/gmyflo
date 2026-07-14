"use client"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconUser,
  IconBarbell,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";

export function Navbar() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "My Gym",
      icon: (
        <IconBarbell className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/gym",
    },
    {
      title: "Members",
      icon: (
        <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/members",
    },
    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Settings",
      icon: (
        <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/settings",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        items={links}
        desktopClassName="fixed left-10 top-1/2 -translate-y-1/2 z-[9999]"
        mobileClassName="fixed right-10 bottom-10 z-[9999]"
      />
    </div>
  );
}
