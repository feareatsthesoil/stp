import { UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { isSignedIn } = useUser();

  useEffect(() => {
    document.body.style.backgroundColor =
      currentRoute.startsWith("/links") || currentRoute.startsWith("/chan")
        ? "#F4F4FE"
        : "#fff";
  }, [currentRoute]);

  const themeColor =
    currentRoute.startsWith("/links") || currentRoute.startsWith("/chan")
      ? "#F4F4FE"
      : "#fff";

  return (
    <div className="flex content-center pt-[25px]">
      <Head>
        <meta name="theme-color" content={themeColor} />
      </Head>
      <div className="w-full text-center font-[Helvetica] text-[1.5rem] font-bold">
        <Link href={"/"}>
          <h1>SERVING the PEOPLE</h1>
        </Link>
      </div>
      <div className="absolute right-[2vw] self-center">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link
            className={`mdMobileX:hidden  ${
              currentRoute === "/login" ? "font-bold" : ""
            }`}
            href={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
