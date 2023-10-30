import ChevronDown from "@/images/icons/chevronDown";
import ChevronUp from "@/images/icons/chevronUp";
import LinkIcon from "@/images/icons/linkIcon";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItem {
  href: string;
  name: string;
  children?: MenuItem[];
}

const LinkComponent = ({ item }: { item: MenuItem }): JSX.Element => {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  if (item.children && item.children.length) {
    return (
      <Menu
        as="div"
        key={item.href}
        className="relative flex flex-col items-center text-center text-base/4"
      >
        {({ open }) => (
          <>
            <Menu.Button
              className={`z-1 flex flex-row rounded-md px-4 py-2 uppercase tracking-wide text-white ${
                isActive ? "bg-neutral-900" : "hover:bg-neutral-900"
              }`}
            >
              {item.name}
              <span
                className={`ml-1 mt-[-0.5rem] ${open ? "hidden" : "block"}`}
              >
                <ChevronDown />
              </span>
              <span
                className={`ml-1 mt-[-0.5rem] sm:mb-[-0.5rem] sm:mt-0 sm:translate-y-[-0.27rem] sm:rotate-90 ${
                  open ? "block" : "hidden"
                }`}
              >
                <ChevronUp />
              </span>
            </Menu.Button>
            {open && (
              <Menu.Items
                static
                className="absolute z-10 mt-10 flex w-max flex-col items-center rounded-md bg-[#000000e3] tracking-wide text-white sm:ml-80 sm:mt-0 sm:items-start"
              >
                {item.children?.map((child) => (
                  <Menu.Item key={child.href}>
                    <Link
                      href={child.href}
                      className={`flex flex-row rounded-md px-4 py-[0.55rem] text-base/4 tracking-wide ${
                        isActive ? "bg-neutral-900" : "hover:bg-neutral-900"
                      }`}
                      target={child.href.startsWith("https://") ? "_blank" : ""}
                    >
                      {child.name}
                      {child.href.startsWith("https://") ? (
                        <span className="translate-y-[-0.1rem]">
                          <LinkIcon />
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    );
  } else {
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex flex-col rounded-md px-4 py-2 text-center text-base/4 tracking-wide text-white ${
          isActive ? "bg-neutral-900" : "hover:bg-neutral-900"
        }`}
      >
        {item.name}
      </Link>
    );
  }
};

export default LinkComponent;
