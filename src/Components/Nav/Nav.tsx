import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import nav from "../Nav/Nav.json";
import css from "./Nav.module.css";

const NavBar = () => {
  const user = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  const isChanRoute = currentRoute.startsWith("/chan");

  return (
    <div
      className={`my-5 w-[96vw] border-[0] border-b border-t border-solid border-black p-5 ${
        isChanRoute ? "border-slate-300" : ""
      }`}
    >
      <nav>
        <ul className="flex flex-row flex-wrap place-content-center">
          {nav.items.map(({ href, name }, index) => {
            const isLastItem =
              index === nav.items.length - 1 && !user.isSignedIn;
            return (
              <li
                key={name}
                className={`border-[0] px-1 text-blue-600 ${
                  !isLastItem && "border-r-[1px]"
                } border-solid border-black underline hover:text-indigo-600`}
              >
                <Link
                  href={href}
                  className={
                    href === "/"
                      ? currentRoute === href
                        ? "text-indigo-600"
                        : css.a
                      : currentRoute.startsWith(href)
                      ? "text-indigo-600"
                      : css.a
                  }
                >
                  {name}
                </Link>
              </li>
            );
          })}
          {!user.isSignedIn && (
            <li id="list-item min-[570px]:hidden">
              <Link
                href={"/login"}
                className={`h-0.5 border-l-[1px] border-solid border-black pl-1 text-blue-600 underline hover:text-indigo-600 ${
                  currentRoute.startsWith("/login") ? "text-indigo-600" : css.a
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
