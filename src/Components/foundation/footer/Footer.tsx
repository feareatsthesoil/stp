"use client";

import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const links = [
    {
      href: "https://blog.stp.world",
      content: "Join Our Mailing List",
      className: "hidden lg:block",
    },
    {
      href: "/",
      content: "©2023 The STP Creative LLC",
      className: "",
    },
    {
      href: "mailto:info@stp.world",
      content: "contact@stp.world",
      className: "hidden md:block",
    },
    {
      href: "https://instagram.com/servingthepeople",
      content: "@servingthepeople",
      className: "hidden sm:block",
    },
  ];

  return (
    <>
      <div className="mt-auto flex flex-col items-center">
        <ul className="mb-4 flex w-[calc(100vw-2rem)] justify-center font-sans text-sm/4 uppercase tracking-wide text-slate-600 sm:justify-between">
          {links.map((link, index) => (
            <li key={index} className={link.className}>
              <Link
                href={link.href}
                target={index !== 1 ? "_blank" : ""}
                className="rounded-md px-4 py-2 hover:bg-slate-200 hover:text-slate-800"
              >
                {link.content}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Footer;
