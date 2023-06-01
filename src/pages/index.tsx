import React from "react"
import Image from 'next/image'
import Link from "next/link"
import useSWR from 'swr';

import css from "../styles/Home.module.css"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import homePic from "../../public/Images/home.jpg"
import Nav from "../Components/Nav/Nav"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/calendar/next', fetcher);

  if (error) return <div>Error loading data</div>
  if (!data) return <div>Loading...</div>

  const eventDate = new Date(data.start.dateTime);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(eventDate);


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
        <div className="w-[96vw]">
          <p className="pt-5 text-base text-center font-bold" >Community Photo Thompkins Square Park</p>
          <p className="text-sm text-center font-bold" >Photo Credit: <Link className="text-blue-600 hover:text-indigo-600 underline" href="https://www.instagram.com/graysorrenti/">Gray Sorrenti</Link></p>
          <p className="text-base px-[2vw] pt-5">Serving the People is a 501(c)(3) non-profit organization that assists artists and creators in making meaningful connections both online and in person. Established in 2017, STP has launched a number of initiatives and developed a platform for connecting creators with audiences, as well as finding opportunities for collaboration and support.</p>
          <p className="text-base px-[2vw] pt-5">Our organization hosts weekly in-person meetings led by artists, providing a space for creative collaboration and discussion. These meetings offer members the opportunity to connect and engage in meaningful dialogue about their work, ideas, and projects. They are designed to foster a supportive and inclusive environment where members can share their experiences and learn from one another.</p>
        </div>
        <div className="w-[96vw] border-[0] mt-5 p-5 border-t border-b border-solid border-black place-content-center flex flex-row font-bold text-sm ">
          <Link href={data.htmlLink} target="_blank" rel="noreferrer" className="flex hover:text-slate-600">
            <p className="pr-1 min-w-max">This Week:</p>
            <div>
              <h2>{data.summary}{data.location && <> at: <Link className="text-blue-600 hover:text-indigo-600 underline"
                href={`http://google.com/maps/search/${data.location}`} target="_blank" rel="noreferrer">{data.location}</Link></>}</h2>
              <p>{formattedDate}</p>
            </div>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  )
}

