import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="mt-4 flex content-center">
      <div className="w-full text-center font-[Helvetica] text-[1.5rem] font-bold">
        <Link href={"/"}>
          <h1>SERVING the PEOPLE</h1>
        </Link>
      </div>
    </div>
  );
}

export default Header;
