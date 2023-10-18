"use client";

import Footer from "@/components/portal/footer/Footer";
import Logo from "@/components/portal/logo/Logo";
import nav from "@/components/portal/nav/Nav.json";
import { Menu } from "@headlessui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import ChevronDown from "@/images/icons/chevronDown";
import ChevronUp from "@/images/icons/chevronUp";
import LinkIcon from "@/images/icons/linkIcon";
interface MenuItem {
  href: string;
  name: string;
  children?: MenuItem[];
}

function multiLink(item: MenuItem) {
  return (
    <Menu
      as="div"
      key={item.href}
      className="relative flex flex-col items-center text-center text-base/4"
    >
      {({ open }) => (
        <>
          <Menu.Button className="z-1 flex flex-row uppercase tracking-wide text-white">
            {item.name}
            <span className={`ml-1 mt-[-0.5rem] ${open ? "hidden" : "block"}`}>
              <ChevronDown />
            </span>
            <span className={`ml-1 mt-[-0.5rem] ${open ? "block" : "hidden"}`}>
              <ChevronUp />
            </span>
          </Menu.Button>
          {open && (
            <Menu.Items
              static
              className="absolute z-10 mt-6 flex w-max flex-col items-center rounded-md bg-[#000000e3] tracking-wide text-white shadow-lg ring-1 ring-black ring-opacity-5"
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
                <Menu.Item key={child.href}>
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
    <Link
      key={item.href}
      href={item.href}
      className="flex flex-col text-center text-base/4 tracking-wide text-white"
    >
      {item.name}
    </Link>
  );
}

const Home: React.FC = () => {
  return (
    <>
      <div className="relative flex min-h-[100svh] flex-col items-center justify-between bg-black">
        <Head>
          <title>Serving the People</title>
        </Head>
        <div className="flex flex-grow flex-col items-center justify-center">
          <motion.div
            initial={{ y: "130px" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5 }}
          >
            <Logo width={95} />
          </motion.div>
          <motion.ul
            className="flex flex-col items-center justify-center font-sans text-sm uppercase text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.5,
              staggerChildren: 0.5,
            }}
          >
            <motion.li
              className="relative mt-10 space-y-7"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {nav.items.map((item) => {
                return item.children && item.children.length
                  ? multiLink(item)
                  : singleLink(item);
              })}
            </motion.li>
          </motion.ul>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
