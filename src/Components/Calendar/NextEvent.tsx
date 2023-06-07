import React from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NextEvent() {
  const { data, error } = useSWR("/api/calendar/next", fetcher);

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
    <div className="w-[96vw] border-[0] mt-5 p-5 border-t border-b border-solid border-black place-content-center flex flex-row font-bold text-sm ">
      <Link
        href={data.htmlLink}
        target="_blank"
        rel="noreferrer"
        className="flex hover:text-slate-600"
      >
        <p className="pr-1 min-w-max">This Week:</p>
        <div>
          <h2>
            {data.summary}
            {data.location && (
              <>
                {" "}
                at:{" "}
                <Link
                  className="text-blue-600 hover:text-indigo-600 underline"
                  href={`http://google.com/maps/search/${data.location}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.location}
                </Link>
              </>
            )}
          </h2>
          <p>{formattedDate}</p>
        </div>
      </Link>
    </div>
  );
}
