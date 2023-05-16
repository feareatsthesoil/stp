import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button, Stack } from "@mui/material";
import { google } from "calendar-link";
import _ from "lodash";
import moment from "moment";

import css from "./Calendar.module.css";
import SocialLinks from "../SocialLinks/SocialLinks";
import { useEvents } from "../../redux/hooks";

export default function Calendar() {
  // const data = useEvents();
  // const { userId } = useAuth();
  // const dateList = _.groupBy(data, (row) =>
  //   moment(row.starts_at).format("YYYY-MM-DD")
  // );

  return (
    <div className="relative pb-[75%] h-0 overflow-hidden">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_ebae14cd7205ace748c237d5831a59fcac6bb9addffa36b237134fe1a5828be3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="hidden sm:block border-0 absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        scrolling="no"
      ></iframe>
      <iframe
        src="https://calendar.google.com/calendar/embed?mode=AGENDA&src=c_ebae14cd7205ace748c237d5831a59fcac6bb9addffa36b237134fe1a5828be3%40group.calendar.google.com&ctz=America%2FNew_York"
        className="sm:hidden border-0 absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );

  // return (
  //   <>
  //     {Object.entries(dateList).length === 0 && <div>
  //       No events for now... Stay tuned! </div>}
  //     {Object.entries(dateList).map(([date, list]) => {
  //       return (
  //         <div key={date} className={css.dateGroup}>
  //           <div key={date}>
  //             <Link legacyBehavior href={`#${date}`}>
  //               <h2
  //                 id={date}
  //                 className={css.date}
  //               >
  //                 {moment(date).format("MMMM DD, YYYY")}
  //               </h2>
  //             </Link>
  //           </div>
  //           {list.map((row) => {
  //             return (
  //               <div key={row.id} className={css.eventRow}>
  //                 <Link
  //                   scroll={true}
  //                   className={css.mainEvent}
  //                   href={`/calendar/${row.id}`}
  //                 >
  //                   {" "}
  //                   <div className={css.eventInfo}>
  //                     <strong>{row.name}</strong>
  //                     <div className={css.spacer} />
  //                     <div>
  //                       {moment(row.starts_at).format("MMMM DD, YYYY hh:mm A")}
  //                       {row.ends_at ?
  //                         <> - {moment(row.ends_at)
  //                           .format("MMMM DD, YYYY hh:mm A")} </> : ""}
  //                     </div>
  //                     <div className={css.spacer} />
  //                     {row.address}
  //                     <div className={css.spacer} />
  //                     {row.description}
  //                     <div className={css.spacer} />
  //                   </div>
  //                 </Link>
  //                 <div className={css.buttonWrapper}>
  //                   <Stack direction={"row"} spacing={2}>
  //                     <Button
  //                       className={`${css.button} ${css.add}`}
  //                       href={google({
  //                         title: row.name,
  //                         description: row.description,
  //                         start: row.starts_at,
  //                         end: row.ends_at ?? row.starts_at
  //                       })}
  //                       target="_blank" rel="noreferrer" variant="contained">
  //                       Add to calendar
  //                     </Button>
  //                     {userId === row.userId ?
  //                       <Link className={css.editLink} href={`/calendar/${row.id}/edit`}>
  //                         <Button className={`${css.button} ${css.edit}`}>
  //                           Edit
  //                         </Button></Link>
  //                       : null}
  //                   </Stack>
  //                 </div>
  //                 <SocialLinks eventId={row.id} />
  //               </div>
  //             )
  //           })}
  //         </div>
  //       )
  //     })}
  //   </>
  // )
}
