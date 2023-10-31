"use client";

import Logo from "@/components/portal/logo/Logo";
import ChevronDown from "@/images/icons/chevronDown";
import ChevronUp from "@/images/icons/chevronUp";
import LinkIcon from "@/images/icons/linkIcon";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import nav from "./Nav.json";

interface HeaderProps {
  showLogo?: boolean;
}

interface MenuItem {
  href: string;
  name: string;
  children?: MenuItem[];
}

function RecursiveLink({
  item,
  index,
  level = 0,
}: {
  item: MenuItem;
  index: number;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Menu as="div" key={item.href} className="relative inline-block self-start">
      <Menu.Button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${
          isActive
            ? "bg-slate-200 text-slate-800"
            : `hover:bg-slate-100 hover:text-slate-800  ${
                index > 0 ? "" : "md:hover:bg-slate-200"
              }`
        } ${
          level > 0 ? "w-[8.2rem]" : "w-[6.1rem]"
        } z-50 flex flex-row-reverse rounded-md px-4 uppercase tracking-wide text-slate-600 md:flex-row`}
      >
        {item.name}
        <span
          className={`mr-1 translate-x-[-0.15rem] md:ml-1 md:mr-0 md:translate-x-0 ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <ChevronDown />
        </span>
        <span
          className={`mt-[0.2rem] translate-x-[-0.5rem] md:ml-1 md:mr-0 md:translate-x-0 ${
            isOpen ? "block" : "hidden"
          } ${
            level > 0
              ? "mt-[0rem] sm:mt-[0.2rem] sm:rotate-[270deg] md:rotate-90"
              : "rotate-[270deg] md:mt-0  md:rotate-0"
          }`}
        >
          <ChevronUp />
        </span>
      </Menu.Button>
      {isOpen && (
        <div>
          <Menu.Items
            static
            className={`flex-end absolute top-0 z-40 flex w-max translate-y-[-0.45rem] flex-col items-end rounded-md bg-slate-200 p-2 text-slate-600 ring-1 ring-black ring-opacity-5 md:left-0 md:right-0 md:items-start ${
              level > 0
                ? "right-[-0.46rem] translate-y-[85px] sm:right-[9.15rem] sm:translate-y-[-0.45em] md:left-[9.2rem]"
                : "right-[7rem] md:mt-12"
            }`}
          >
            {item.children?.map((child, childIndex) => (
              <Menu.Item key={child.href} as="div">
                {child.children && child.children.length ? (
                  <RecursiveLink
                    item={child}
                    index={childIndex}
                    level={level + 1}
                  />
                ) : (
                  <Link
                    href={child.href}
                    className={`flex flex-row rounded-md px-4 py-[.4rem] text-sm ${
                      isActive
                        ? "bg-slate-100 text-slate-800"
                        : "hover:bg-slate-100"
                    }`}
                    target={child.href.startsWith("https://") ? "_blank" : ""}
                  >
                    {child.name}
                    {child.href.startsWith("https://") ? (
                      <LinkIcon fill="#475569" />
                    ) : (
                      ""
                    )}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
}

function singleLink(item: MenuItem) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.href}
      href={item.href}
      className={`w-[100%] self-end rounded-md px-4 text-slate-600 ${
        isActive
          ? "bg-slate-100 text-slate-800 md:bg-slate-200"
          : "hover:bg-slate-100 hover:text-slate-800 md:hover:bg-slate-200"
      }`}
    >
      {item.name}
    </Link>
  );
}

function Header({ showLogo }: HeaderProps) {
  const user = useUser();
  const pathname = usePathname();
  const isActive = pathname === "/login";

  return (
    <div className="mx-2 mb-2 flex w-full flex-row-reverse justify-between md:mb-0 md:w-min md:flex-col">
      {user.isSignedIn && (
        <div className="absolute left-4 top-4 z-50 md:left-auto md:right-4 md:top-2">
          <UserButton afterSignOutUrl="/login" />
        </div>
      )}
      <Disclosure as="nav" className="w-full">
        {({ open }) => (
          <>
            <div className="relative flex h-16 items-center justify-between md:hidden">
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Disclosure.Button className="relative z-50 inline-flex rounded-md p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-800 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <Disclosure.Panel className="absolute right-4 z-50 rounded-md bg-slate-200 px-2 py-2 font-sans text-sm/8 uppercase tracking-wide md:hidden">
              <div className="flex flex-col space-y-4 text-left">
                {nav.items.map((item, index) => {
                  return item.children && item.children.length
                    ? RecursiveLink({ item, index })
                    : singleLink(item);
                })}
                {!user.isSignedIn &&
                  singleLink({ href: "/login", name: "Login" })}
              </div>
            </Disclosure.Panel>
            <div className="mt-2 hidden content-center justify-between font-sans text-sm/8 uppercase tracking-wide md:flex">
              <div className="flex flex-row space-x-5">
                {nav.items.map((item, index) => {
                  return item.children && item.children.length
                    ? RecursiveLink({ item, index })
                    : singleLink(item);
                })}
                {!user.isSignedIn &&
                  singleLink({ href: "/login", name: "Login" })}
              </div>
            </div>
          </>
        )}
      </Disclosure>
      {showLogo && (
        <div className="absolute top-0 z-0 mt-4 flex w-full translate-x-[1rem] place-content-center self-center md:static md:translate-x-0">
          <Link href="/" className="z-50">
            <Logo width={70} className="shadow-xl shadow-black/10" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
