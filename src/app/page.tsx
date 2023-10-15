"use client";

import Footer from "@/components/portal/footer/Footer";
import Logo from "@/components/portal/logo/Logo";
import nav from "@/components/portal/nav/Nav.json";
import { Menu } from "@headlessui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="relative flex min-h-[100svh] flex-col items-center justify-between bg-black">
        <Head>
          <title>Serving the People</title>
        </Head>
        <ul className="mt-10 flex flex-grow flex-col items-center justify-center font-sans text-sm uppercase text-white">
          <Logo width={100} />
          {nav.items.map((item) => (
            <li key={item.href} className="relative mt-10">
              {item.children && item.children.length ? (
                <Menu as="div" className="relative text-center text-base/4">
                  {({ open }) => (
                    <>
                      <Menu.Button className="uppercase tracking-wide text-white">
                        {item.name}
                      </Menu.Button>
                      {open && (
                        <Menu.Items
                          static
                          className="bg-black-500/100 absolute left-[120px] top-[-15px] w-max rounded-md bg-[#101010] py-1 text-left text-base/6 tracking-wide"
                        >
                          {item.children.map((child) => (
                            <Menu.Item key={child.href}>
                              {({ active }) => (
                                <Link
                                  href={child.href}
                                  className={`${
                                    active
                                      ? "text-white underline"
                                      : "text-white"
                                  } block px-4 py-2`}
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
              ) : (
                <Link
                  href={item.href}
                  className="text-base/4 uppercase tracking-wide text-white"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default Home;
