import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const links = [
    { href: "https://www.instagram.com/servingthepeople/", name: "Instagram" },
    { href: "https://twitter.com/stp_xyz", name: "Twitter" },
    { href: "https://opensea.io/collection/seeds-luciensmith", name: "Opensea" },
    { href: "https://discord.gg/nhqyng5wQ9", name: "Discord" },
  ];

  return (
    <>
      <div
        className={
          currentRoute === "/"
            ? "mt-auto"
            : "w-[96vw] mt-auto border-[0] border-t border-solid border-black place-content-center "
        }
      >
        <div className="mt-auto pt-2 pb-[1vh] w-[96vw] flex flex-row">
          <div className="hidden sm:flex sm:flex-col">
            <p>Copyright © 2023, by The STP Creative Foundation.</p>
            <p>
              All rights reserved. Send comments, suggestions, and/or problems
              to:{" "}
              <Link className="underline" href="mailto:info@stp.world">
                info@stp.world
              </Link>
            </p>
          </div>
          <div className="mt-auto ml-auto flex flex-row">
            {links.map((link, index) => (
              <Link
                href={link.href}
                className={`pl-1 text-blue-600 border-[0] ${index !== links.length - 1 && "border-r-[1px] px-1"} border-solid border-black underline hover:text-indigo-600`}
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
