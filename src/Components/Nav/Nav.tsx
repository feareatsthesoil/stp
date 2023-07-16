import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import nav from "../Nav/Nav.json";

const NavBar = () => {
  const user = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  const isChanRoute = currentRoute.startsWith("/chan");

  return (
    <div
      className={`mt-4 w-[96vw] border-[0] border-b border-t border-solid border-black p-5 ${
        isChanRoute ? "border-slate-300" : ""
      }`}
    >
      <nav>
        <ul className="flex flex-row flex-wrap place-content-center">
          {nav.items.map(({ href, name }, index) => {
            const isFirstItem = index === 0;
            return (
              <li
                key={name}
                className={`border-[0] px-1 text-blue-600 ${
                  !isFirstItem && "border-l-[1px]"
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
            <li className="list-item min-[571px]:hidden">
              <Link
                href={"/login"}
                className={`h-0.5 border-l-[1px] border-solid border-black pl-1 text-blue-600 underline hover:text-indigo-600 ${
                  currentRoute.startsWith("/login") ? "text-indigo-600" : ""
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
