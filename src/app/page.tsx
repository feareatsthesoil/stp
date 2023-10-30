import ThemeComponent from "@/Components/ThemeComponent";
import FooterMotion from "@/Components/portal/hero/FooterMotion";
import LogoMotion from "@/Components/portal/hero/LogoMotion";
import NavListMotion from "@/Components/portal/hero/NavListMotion";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Serving the People",
  themeColor: "#000",
};

const Home: React.FC = () => {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-between bg-black">
      <ThemeComponent color="#000" />
      <div className="mb-14 mt-4 flex flex-grow flex-col items-center justify-center">
        <LogoMotion />
        <NavListMotion />
      </div>
      <FooterMotion />
    </div>
  );
};

export default Home;
