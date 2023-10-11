"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isChanRoute = pathname.startsWith("/chan");

  const links = [
    { href: "https://www.instagram.com/servingthepeople/", name: "Instagram" },
    { href: "https://twitter.com/stp_xyz", name: "Twitter" },
    {
      href: "https://opensea.io/collection/seeds-luciensmith",
      name: "Opensea",
    },
    { href: "https://discord.gg/nhqyng5wQ9", name: "Discord" },
  ];

  useEffect(() => {
    const previousBodyBackgroundColor = document.body.style.backgroundColor;
    if (isChanRoute) {
      document.body.style.backgroundColor = "#F4F4FE";
    }

    return () => {
      document.body.style.backgroundColor = previousBodyBackgroundColor;
    };
  }, [pathname]);

  const themeColor = pathname.startsWith("/chan") ? "#F4F4FE" : "#FFF";

  return (
    <>
      <div
        className={`mt-auto w-full place-content-center border-[0] border-t border-solid  
        ${isChanRoute ? "border-slate-300" : "border-black"}`}
      >
        <Head>
          <meta name="theme-color" content={themeColor} />
        </Head>
        <div className="mt-auto flex flex-row pb-3 pt-2">
          <div className="flex flex-col footerMobileX:hidden">
            <p>Copyright © 2023, by The STP Creative Foundation.</p>
            <p>
              All rights reserved. Send comments, suggestions, and/or problems
              to:{" "}
              <Link className="underline" href="mailto:info@stp.world">
                info@stp.world
              </Link>
            </p>
          </div>
          <div className="ml-auto mt-auto flex flex-row">
            {links.map((link, index) => (
              <Link
                href={link.href}
                className={`border-[0] pl-1 text-blue-600 ${
                  index !== links.length - 1 && "border-r-[1px] px-1"
                } border-solid border-black underline hover:text-indigo-600`}
                target="webapp-tab"
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
