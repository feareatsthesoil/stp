"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";
import nav from "./Nav.json";
import { usePathname } from "next/navigation";
import { UserContext } from "../../userContext";
import usePageLoader from "@/hooks/usePageLoader";

const NavBar = () => {
  const user = useUser();
  const currentRoute = usePathname();
  const isChanRoute = currentRoute.startsWith("/chan");
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  return (
    <div
      className={`mt-0 flex w-full flex-row justify-center border-[0] border-b  border-solid border-black p-3 ${
        isChanRoute ? "border-slate-300" : ""
      }`}
    >
      <nav>
        <ul
          className={`float-left flex flex-row place-content-center ${
            user.isSignedIn
              ? "w-[72vw] overflow-x-scroll mdMobileX:place-content-start"
              : "w-[96vw] flex-wrap"
          }`}
        >
          {nav.items.map(({ href, name }, index) => {
            const isLastItem = index === nav.items.length - 1;
            return (
              <li
                key={name}
                className={`my-1 border-[0] px-1 text-blue-600 ${
                  !isLastItem && "border-r-[1px]"
                } border-solid border-black underline hover:text-indigo-600`}
              >
                <Link
                  href={href}
                  className={
                    href === "/"
                      ? currentRoute === href
                        ? "text-indigo-600"
                        : ""
                      : currentRoute.startsWith(href)
                      ? "text-indigo-600"
                      : ""
                  }
                >
                  {name}
                </Link>
              </li>
            );
          })}
          {!user.isSignedIn && (
            <li className="my-1">
              <Link
                href={"/login"}
                className={`h-0.5 border-l-[1px] border-solid border-black pl-1 text-blue-600 underline hover:text-indigo-600 navMobileX:border-none ${
                  currentRoute.startsWith("/login") ? "text-indigo-600" : ""
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {user.isSignedIn && (
        <div className="absolute right-4 mt-[-0.1rem]">
          <UserButton
            afterSignOutUrl={`${process.env.NEXT_PUBLIC_API_URL}/login`}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
