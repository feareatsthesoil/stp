import Image from "next/image";
import Link from "next/link";
import React, { Suspense, lazy, useMemo } from "react";
import Address from "../Components/Address/address";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Nav from "../Components/Nav/Nav";
import css from "../styles/Home.module.css";

import homePic from "../../public/Images/home.jpg";

const NextEvent = lazy(() => import("../Components/Calendar/NextEvent"));

interface Props {
  data: any;
}

const MyComponent: React.FC<Props> = React.memo(({ data }) => {
  const eventDate = useMemo(
    () => new Date(data.start.dateTime),
    [data.start.dateTime]
  );
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = useMemo(
    () => new Intl.DateTimeFormat("en-US", options).format(eventDate),
    [eventDate]
  );

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
          <Link
            className="text-blue-600 hover:text-indigo-600 underline"
            href="https://www.instagram.com/graysorrenti/"
          >
            Gray Sorrenti
          </Link>
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
      <Suspense fallback={<div>Loading next event...</div>}>
        <NextEvent />
      </Suspense>
    </div>
  );
});

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/calendar/next`
  );

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    return { props: { message } };
  }

  const data = await response.json();

  return {
    props: { data },
  };
}

const Home: React.FC<Props> = ({ data }) => {
  if (!data) return <div>Loading...</div>;
  if (data.message) {
    return <div>Error loading data: {data.message}</div>;
  }

  return <MyComponent data={data} />;
};

export default Home;

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import useSWR from "swr";

// import homePic from "../../public/Images/home.jpg";
// import Address from "../Components/Address/address";
// import Footer from "../Components/Footer/Footer";
// import Header from "../Components/Header/Header";
// import Nav from "../Components/Nav/Nav";
// import css from "../styles/Home.module.css";

// const fetcher = async (url: string) => {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(`Fetcher error: ${error}`);
//     }

//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export default function Home() {
//   const { data, error } = useSWR("/api/calendar/next", fetcher, {
//     onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
//       if (retryCount >= 3) return;
//       setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
//     },
//   });

//   if (error) {
//     if (error.response && error.response.status === 404) {
//       return <div>No upcoming events found</div>;
//     } else if (error.message === "Failed to fetch") {
//       return (
//         <div>
//           Network error. Please check your internet connection and try again.
//         </div>
//       );
//     } else {
//       return <div>Error loading data: {error.message}</div>;
//     }
//   }

//   if (!data) return <div>Loading...</div>;

//   const eventDate = new Date(data.start.dateTime);
//   const options: Intl.DateTimeFormatOptions = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   };
//   const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
//     eventDate
//   );

//   return (
//     <>
//       <div className={css.body}>
//         <Header />
//         <Address />
//         <Nav />
//         <Image
//           placeholder="blur"
//           className={`${css.background} max-w-[1000px]`}
//           src={homePic}
//           alt="SERVING the PEOPLE"
//           quality={50}
//         />
// <div className="w-[96vw]">
//   <p className="pt-5 text-base text-center font-bold">
//     Community Photo Thompkins Square Park
//   </p>
//   <p className="text-sm text-center font-bold">
//     Photo Credit:{" "}
//     <Link
//       className="text-blue-600 hover:text-indigo-600 underline"
//       href="https://www.instagram.com/graysorrenti/"
//     >
//       Gray Sorrenti
//     </Link>
//   </p>
//   <p className="text-base px-[2vw] pt-5">
//     Serving the People is a 501(c)(3) non-profit organization that
//     assists artists and creators in making meaningful connections both
//     online and in person. Established in 2017, STP has launched a number
//     of initiatives and developed a platform for connecting creators with
//     audiences, as well as finding opportunities for collaboration and
//     support.
//   </p>
//   <p className="text-base px-[2vw] pt-5">
//     Our organization hosts weekly in-person meetings led by artists,
//     providing a space for creative collaboration and discussion. These
//     meetings offer members the opportunity to connect and engage in
//     meaningful dialogue about their work, ideas, and projects. They are
//     designed to foster a supportive and inclusive environment where
//     members can share their experiences and learn from one another.
//   </p>
// </div>
// <div className="w-[96vw] border-[0] mt-5 p-5 border-t border-b border-solid border-black place-content-center flex flex-row font-bold text-sm ">
//   <Link
//     href={data.htmlLink}
//     target="_blank"
//     rel="noreferrer"
//     className="flex hover:text-slate-600"
//   >
//     <p className="pr-1 min-w-max">This Week:</p>
//     <div>
//       <h2>
//         {data.summary}
//         {data.location && (
//           <>
//             {" "}
//             at:{" "}
//             <Link
//               className="text-blue-600 hover:text-indigo-600 underline"
//               href={`http://google.com/maps/search/${data.location}`}
//               target="_blank"
//               rel="noreferrer"
//             >
//               {data.location}
//             </Link>
//           </>
//         )}
//       </h2>
//       <p>{formattedDate}</p>
//     </div>
//   </Link>
// </div>
//         <Footer />
//       </div>
//     </>
//   );
// }
