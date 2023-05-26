import React from "react"
import Image from 'next/image'
import useSWR from 'swr';

import css from "../styles/Home.module.css"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import homePic from "../../public/Images/home.jpg"
import Nav from "../Components/Nav/Nav"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/calendar/next', fetcher);

  if (error) return <div>Error loading data</div>
  if (!data) return <div>Loading...</div>
  return (
    <>
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
        <div>
          <p className="pt-5 text-base text-center font-bold" >Community Photo Thompkins Square Park</p>
          <p className="text-sm text-center font-bold" >Photo Credit: <Link className="text-blue-600 underline" href="#">Grey Sorrenti</Link></p>
          <p className="text-base px-[2vw] pt-5">Serving the People is a 501(c)(3) non-profit organization that assists artists and creators in making meaningful connections both online and in person. Established in 2017, STP has launched a number of initiatives and developed a platform for connecting creators with audiences, as well as finding opportunities for collaboration and support.</p>
          <p className="text-base px-[2vw] pt-5">Our organization hosts weekly in-person meetings led by artists, providing a space for creative collaboration and discussion. These meetings offer members the opportunity to connect and engage in meaningful dialogue about their work, ideas, and projects. They are designed to foster a supportive and inclusive environment where members can share their experiences and learn from one another. We believe that these in-person gatherings are an important part of our mission to assist artists and creators in making meaningful connections both online and offline.</p>
        </div>
        <div className="w-[96vw] border-[0] mt-5 p-5 border-t border-b border-solid border-black place-content-center flex flex-row font-bold text-sm">
          <p className="pr-1">Next Meeting:</p>
          <h2>{data.name}</h2>
          <h2>{data.location}</h2>
          <p>{new Date(data.starts_at).toLocaleString()}</p>
        </div>
        <Footer />
      </div>
    </>
  )
}
