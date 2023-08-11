import { useAuth } from "@clerk/nextjs";
import { Wrapper } from "@googlemaps/react-wrapper";
import { google } from "calendar-link";
import moment from "moment";
import Link from "next/link";
import { CalendarEventType } from "../../types/index";
import SocialLinks from "../SocialLinks/SocialLinks";
import Map from "./Map";

export function CalendarEventComponent(params: {
  row: CalendarEventType;
}): JSX.Element {
  const row: CalendarEventType = params.row;
  const { userId } = useAuth();

  return (
    <div className="mt-4 flex flex-col gap-y-2">
      <div className=" overflow-hidden">
        <h1 className="text-lg font-bold">{row.name}</h1>
        {row.address && <p className="">{row.address}</p>}
        <div className="">
          {moment(row.starts_at).format("MMMM DD, YYYY")}
          &nbsp;
          {moment(row.starts_at).format("hh:mm A")}
          {row.ends_at && row.ends_at !== "" && (
            <>
              &nbsp;to&nbsp;
              {moment(row.ends_at).format("MMMM DD, YYYY")}
              &nbsp;
              {moment(row.ends_at).format("hh:mm A")}
            </>
          )}
        </div>
        {row.description && <p className="mt-2">{row.description}</p>}
        {row.website && (
          <Link
            target="webapp-tab"
            href={row.website}
            className="text-blue-600 underline"
          >
            {row.website}
          </Link>
        )}
        {row.email && <p>Contact: {row.email}</p>}
        <div className="mt-3 flex gap-x-2">
          <Link
            href={google({
              title: row.name,
              description: row.description,
              start: row.starts_at,
              end: row.ends_at ?? row.starts_at,
            })}
            target="_blank"
            rel="noreferrer"
          >
            <button className="h-8 rounded-md border border-solid border-black bg-[#efefef] px-2 font-sans text-sm hover:bg-[#dcdcdc]">
              Add to calendar
            </button>
          </Link>
          {row.address && (
            <>
              <Link
                href={`http://google.com/maps/search/${row.address}`}
                target="_blank"
                rel="noreferrer"
              >
                <button className="h-8 rounded-md border border-solid border-black bg-[#efefef] px-2 font-sans text-sm hover:bg-[#dcdcdc]">
                  Open in map
                </button>
              </Link>
            </>
          )}
          {userId === row.userId ? (
            <Link href={`/calendar/${row.id}/edit`}>
              <button className="h-8 rounded-md border border-solid border-black bg-[#efefef] px-2 font-sans text-sm hover:bg-[#dcdcdc]">
                Edit
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      {row.address && (
        <div>
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map address={row.address} />
          </Wrapper>
        </div>
      )}
      <SocialLinks eventURL={`${window.location.href}/${row.id}`} />
    </div>
  );
}

export default CalendarEventComponent;
