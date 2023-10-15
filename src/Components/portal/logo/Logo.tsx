import React from "react";
import logo from "@/images/logo.svg";
import Image from "next/image";

interface LogoProps {
  width: number;
}

const Logo = ({ width }: LogoProps) => {
  return (
    <div>
      <Image src={logo} alt="Serving the People Creative Logo" width={width} />
    </div>
  );
};

export default Logo;
