import React from "react";
import Image from "next/image";
import Address from "../Components/Address/address";
import Header from "../Components/Header/Header";
import Nav from "../Components/Nav/Nav";
import css from "../styles/Home.module.css";
import homePic from "../../public/Images/home.jpg";
import NextEvent from "../Components/Calendar/NextEvent";

const Home: React.FC = () => {
  return (
    <div className={css.body}>
      <Header />
      <Address />
      <Nav />
      <Image
        placeholder="blur"
        className={`${css.background} max-w-[1000px]`}
        src={homePic}
        alt="SERVING the PEOPLE"
        quality={50}
      />
      <div className="w-[96vw]">
        <p className="pt-5 text-base text-center font-bold">
          Community Photo Thompkins Square Park
        </p>
        <p className="text-sm text-center font-bold">
          Photo Credit:{" "}
          <a
            className="text-blue-600 hover:text-indigo-600 underline"
            href="https://www.instagram.com/graysorrenti/"
          >
            Gray Sorrenti
          </a>
        </p>
        <p className="text-base px-[2vw] pt-5">
          Serving the People is a 501(c)(3) non-profit organization that assists
          artists and creators in making meaningful connections both online and
          in person. Established in 2017, STP has launched a number of
          initiatives and developed a platform for connecting creators with
          audiences, as well as finding opportunities for collaboration and
          support.
        </p>
        <p className="text-base px-[2vw] pt-5">
          Our organization hosts weekly in-person meetings led by artists,
          providing a space for creative collaboration and discussion. These
          meetings offer members the opportunity to connect and engage in
          meaningful dialogue about their work, ideas, and projects. They are
          designed to foster a supportive and inclusive environment where
          members can share their experiences and learn from one another.
        </p>
      </div>
      <NextEvent />
    </div>
  );
};

export default Home;
