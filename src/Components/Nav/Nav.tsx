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

  return (
    <div className="w-[96vw] border-[0] my-5 p-5 border-t border-b border-solid border-black ">
      <nav>
        <ul className="flex flex-row place-content-center flex-wrap">
          {nav.items.map(({ href, name }, index) => {
            const isLastItem =
              index === nav.items.length - 1 && !user.isSignedIn;
            return (
              <li
                key={name}
                className={`px-1 text-blue-600 border-[0] ${
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
            <li id="MobileLogin">
              <Link
                href={"/login"}
                className={`pl-1 border-l-[1px] h-0.5 border-solid border-black text-blue-600 underline hover:text-indigo-600 ${
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
