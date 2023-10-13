"use client";

import Footer from "@/components/portal/footer/Footer";
import nav from "@/components/portal/nav/nav.json";
import { Menu } from "@headlessui/react";
import Head from "next/head";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Serving the People</title>
      </Head>
      <div className="flex h-[90vh] flex-col justify-between">
        <div className="flex flex-grow flex-col items-center justify-center">
          <ul className="flex flex-col items-center">
            {nav.items.map((item, index) => (
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
                                  <a
                                    href={child.href}
                                    className={`${
                                      active
                                        ? "text-white underline"
                                        : "text-white"
                                    } block px-4 py-2`}
                                  >
                                    {child.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        )}
                      </>
                    )}
                  </Menu>
                ) : (
                  <a
                    href={item.href}
                    className="text-base/4 uppercase tracking-wide text-white"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
