"use client";

import Logo from "@/components/portal/logo/Logo";
import nav from "@/components/portal/nav/Nav.json";
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
    <Menu as="div" key={item.href} className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="text-sm/4 uppercase tracking-wide text-white">
              {item.name}
            </Menu.Button>
          </div>
          {open && (
            <Menu.Items
              static
              className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } block px-4 py-2 text-sm`}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
              {item.children?.map((child) => (
                <Menu.Item key={child.href}>
                  {({ active }) => (
                    <Link
                      href={child.href}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm`}
                    >
                      {child.name}
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
    <Link key={item.href} href={item.href} className="text-white">
      {item.name}
    </Link>
  );
}

function Header() {
  return (
    <div className="flex w-full flex-row-reverse justify-between px-4 sm:w-min sm:flex-col">
      <div className="mt-5 flex content-center justify-between font-sans text-sm/4 uppercase tracking-wide">
        <div className="flex flex-col space-x-9 sm:flex-row">
          {nav.items.map((item) => {
            return item.children && item.children.length
              ? multiLink(item)
              : singleLink(item);
          })}
        </div>
      </div>
      <div className="logo my-8 flex place-content-center">
        <Link href="/">
          <Logo width={70} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
