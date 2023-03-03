import Link from "next/link"


import calendar from "./Calendar.module.css"
import _ from "lodash"
import moment from "moment"
import { CalendarRow } from "../../types"

export default function Calendar({ data }: { data: CalendarRow[] }) {
  const dateList = _.groupBy(data, (row) => row.start_date)
  return (
    <>
      <div className={calendar.body}>
        <div className={calendar.headerBody}>
          <h1 className={calendar.header}>2023 Calendar</h1>
          <div className={calendar.bio}>
            <p>To <Link href="/calendar/submit">submit</Link> to the calendar please <Link href="/about">log in</Link>.
              All submissions are subject to review. If you would like to receive updates
              you can sign up for our <Link href="/about"> newsletter</Link> or <Link
                href="https://calendar.google.com/calendar/u/0?cid=anZhcmR5QHphdmFsLmNv" target="webapp-tab">add calendar</Link>.
            </p>
            <p>By submitting to the calendar you are agreeing to our <Link href="/">Privacy Policy</Link></p>
          </div>
        </div>
        {Object.entries(dateList).map(([date, list]) => {
          // console.log(calendar.dateGroup)
          return (
            <div key={date} className={calendar.dateGroup}>
              <div key={date}>
                <Link legacyBehavior href={`#${date}`}>
                  <a>
                    <h2 id={date} className={calendar.date}>{moment(date).format("MMMM DD, YYYY")}</h2>
                    </a>
                </Link>
              </div>
              {list.map((row) => {
                return (
                  <div key={row.id} className={calendar.eventRow}>
                    <Link href={`/calendar/${row.id}`}>
                      {" "}
                      {row.name},{" "}
                      <span className={calendar.timeColumn}>{row.start_time}</span>{" "}
                      - {row.end_time} {row.location}</Link>
                  </div>
                )
              })}
            </div>

          )
        })}
      </div>
    </>
  )
}
