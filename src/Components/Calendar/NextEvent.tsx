import Link from "next/link";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NextEvent() {
  const { data, error } = useSWR("/api/calendar/next", fetcher);

  useEffect(() => {
    if (error) {
      const retryTimeout = setTimeout(() => mutate("/api/calendar/next"), 200);
      return () => clearTimeout(retryTimeout);
    }
  }, [error]);

  if (error)
    return (
      <div className="mt-5 flex w-full flex-row place-content-center border-[0] border-b border-t border-solid border-black p-5 text-sm font-bold ">
        Loading...
      </div>
    );
  if (!data)
    return (
      <div className="mt-5 flex w-full flex-row place-content-center border-[0] border-b border-t border-solid border-black p-5 text-sm font-bold ">
        Loading...
      </div>
    );

  console.log("Data from API:", data);

  if (data && data.message) {
    return (
      <div className="mt-5 flex w-full flex-row place-content-center border-[0] border-b border-t border-solid border-black p-5 text-sm font-bold ">
        {data.message}
      </div>
    );
  }

  const eventDate = data && data.start ? new Date(data.start.dateTime) : null;

  if (eventDate && !isNaN(eventDate.getTime())) {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      eventDate
    );

    return (
      <div className="mt-4 flex w-full flex-row place-content-center border-[0] border-b border-t border-solid border-black p-5 text-sm font-bold ">
        <Link
          href={data.htmlLink}
          target="_blank"
          rel="noreferrer"
          className="flex hover:text-slate-600"
        >
          <p className="min-w-max pr-1">Upcoming:</p>
          <div>
            <h2>
              {data.summary}
              {data.location && (
                <>
                  {" "}
                  at:{" "}
                  <Link
                    className="text-blue-600 underline hover:text-indigo-600"
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
}
