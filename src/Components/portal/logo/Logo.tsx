import logo from "@/images/logo.svg";
import Image from "next/image";
import React from "react";

interface LogoProps {
  width: number;
  className?: string;
}

const Logo = ({ width, className }: LogoProps) => {
  return (
    <Image
      src={logo}
      alt="Serving the People Creative Logo"
      width={width}
      quality={100}
      priority={true}
      draggable={false}
      className={className}
    />
  );
};

export default Logo;
