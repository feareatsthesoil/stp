import Image from "next/image";
import React from "react";
import homePic from "../../public/Images/home.jpg";
import NextEvent from "../Components/Calendar/NextEvent";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Nav from "../Components/Nav/Nav";

const Home: React.FC = () => {
  return (
    <div className="relative mx-4 flex min-h-[100svh] flex-col items-center">
      <Nav />
      <Header />
      <div className="mt-2 text-center">
        <p className="leading-3">83 Canal Street</p>
        <p className="">New York, NY 10002</p>
        <p className="text-[1.35em] leading-6">Official Website</p>
      </div>
      <Image
        placeholder="blur"
        className="mt-4 w-full max-w-[1000px]"
        src={homePic}
        alt="SERVING the PEOPLE"
        quality={50}
      />
      <div className="w-full max-w-[1000px]">
        <p className="pt-3 text-center text-base font-bold">
          Community Photo Thompkins Square Park
        </p>
        <p className="text-center text-sm font-bold">
          Photo Credit:{" "}
          <a
            className="text-blue-600 underline hover:text-indigo-600"
            href="https://www.instagram.com/graysorrenti/"
          >
            Gray Sorrenti
          </a>
        </p>
        <p className="pt-2 text-base">
          Serving the People is a 501(c)(3) non-profit organization that assists
          artists and creators in making meaningful connections both online and
          in person. Established in 2017, STP has launched a number of
          initiatives and developed a platform for connecting creators with
          audiences, as well as finding opportunities for collaboration and
          support.
        </p>
        <p className="max-w-[1000px] pt-4 text-base">
          Our organization hosts weekly in-person meetings led by artists,
          providing a space for creative collaboration and discussion. These
          meetings offer members the opportunity to connect and engage in
          meaningful dialogue about their work, ideas, and projects. They are
          designed to foster a supportive and inclusive environment where
          members can share their experiences and learn from one another.
        </p>
      </div>
      <NextEvent />
      <Footer />
    </div>
  );
};

export default Home;
