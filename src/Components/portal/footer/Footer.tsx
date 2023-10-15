"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
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
      className: "block mdMobileX:hidden",
    },
  ];

  return (
    <>
      <div className="mt-auto">
        <ul className="mb-2 mt-10 flex w-[100vw] justify-around font-sans text-sm/4 uppercase tracking-wide text-white">
          {links.map((link, index) => (
            <li key={index} className={link.className}>
              <Link href={link.href} target={index !== 1 ? "_blank" : ""}>
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
