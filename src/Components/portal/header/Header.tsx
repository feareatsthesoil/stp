"use client";

import Logo from "@/components/portal/logo/Logo";
import nav from "@/components/portal/nav/Nav.json";
import ChevronDown from "@/images/icons/chevronDown";
import ChevronUp from "@/images/icons/chevronUp";
import LinkIcon from "@/images/icons/linkIcon";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import React from "react";

interface MenuItem {
  href: string;
  name: string;
  children?: MenuItem[];
}

function multiLink(item: MenuItem) {
  return (
    <Menu as="div" key={item.href} className="relative inline-block self-end">
      {({ open }) => (
        <>
          <Menu.Button className="flex flex-row-reverse uppercase tracking-wide text-white sm:flex-row">
            {item.name}
            <span
              className={`mr-1 sm:ml-1 sm:mr-0 ${open ? "hidden" : "block"}`}
            >
              <ChevronDown />
            </span>
            <span
              className={`mr-1 sm:ml-1 sm:mr-0 ${open ? "block" : "hidden"}`}
            >
              <ChevronUp />
            </span>
          </Menu.Button>
          {open && (
            <Menu.Items
              static
              className="absolute right-0 z-50 mt-2 flex w-max origin-top-right flex-col items-end rounded-md bg-[#000000e3] text-right text-white shadow-lg ring-1 ring-black ring-opacity-5 sm:left-0 sm:items-start"
            >
              {/* <Menu.Item>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={`flex flex-row px-4 py-2 text-sm ${
                      active ? "underline" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item> */}
              {item.children?.map((child) => (
                <Menu.Item key={child.href} className="" as="div">
                  {({ active }) => (
                    <Link
                      href={child.href}
                      className={`flex flex-row px-4 py-2 text-sm ${
                        active ? "underline" : ""
                      }`}
                      target={child.href.startsWith("https://") ? "_blank" : ""}
                    >
                      {child.name}
                      {child.href.startsWith("https://") ? <LinkIcon /> : ""}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
}

function singleLink(item: MenuItem) {
  return (
    <Link key={item.href} href={item.href} className="self-end text-white">
      {item.name}
    </Link>
  );
}

function Header() {
  return (
    <div className="flex w-full flex-row-reverse justify-between px-4 sm:w-min sm:flex-col">
      <div className="mt-2 flex content-center justify-between font-sans text-sm/8 uppercase tracking-wide">
        <div className="flex flex-col space-x-5 sm:flex-row">
          {nav.items.map((item) => {
            return item.children && item.children.length
              ? multiLink(item)
              : singleLink(item);
          })}
        </div>
      </div>
      <div className="mb-5 mt-4 flex place-content-center sm:mt-2">
        <Link href="/">
          <Logo width={70} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
