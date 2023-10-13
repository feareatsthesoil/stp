"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  const links = [
    {
      href: "https://blog.stp.world",
      name: "Join Our Mailing List",
      tag: "join",
    },
    {
      href: "/",
      name: "©2023 The STP Creative LLC",
      tag: "name",
    },
    {
      href: "mailto:info@stp.world",
      name: "contact@stp.world",
      tag: "contact",
    },
    {
      href: "https://instagram.com/servingthepeople",
      name: "@SERVINGTHEPEOPLE",
      tag: "social",
    },
  ];

  const getClassNameByTag = (tag: string) => {
    switch (tag) {
      case "join":
        return "md:block";
      case "name":
        return "block";
      case "contact":
        return "lg:block";
      case "social":
        return "xl:block";
    }
  };

  return (
    <>
      <div className="mb-5 mt-auto w-full">
        <div className="mx-10 flex justify-center gap-x-5">
          {links.map((link) => (
            <Link href={link.href} key={link.name}>
              <span
                className={`uppercase tracking-wide ${
                  link.tag !== "name" ? "hidden" : ""
                } ${getClassNameByTag(link.tag)} mx-2 text-white`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
