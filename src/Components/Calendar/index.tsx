import Link from "next/link"
import index from "./Calendar.module.css"
import _ from "lodash"
import moment from "moment"
import { google } from 'calendar-link'
import { useEvents } from "../../redux/hooks"
import { Button } from "@mui/material"
import SocialLinks from "../SocialLinks/SocialLinks"

export default function Calendar() {
  const data = useEvents()
  const dateList = _.groupBy(data, (row) => moment(row.starts_at).format("YYYY-MM-DD"))

  return (
    <>
      {Object.entries(dateList).filter(([date]) => { return moment(date).diff(moment()) > 0 }).map(([date, list]) => {
        return (
          <div key={date} className={index.dateGroup}>
            <div key={date}>
              <Link legacyBehavior href={`#${date}`}>
                <h2
                  id={date}
                  className={index.date}
                >
                  {moment(date).format("MMMM DD, YYYY")}
                </h2>
              </Link>
            </div>
            {list.map((row) => {
              return (
                <div key={row.id} className={index.eventRow}>
                  <Link scroll={true} className={index.mainEvent} href={`/calendar/${row.id}`}>
                    {" "}
                    <strong>{row.name}</strong>
                    <div className={index.eventInfo}>
                      <div className={index.spacer} />
                      <div>
                        {moment(row.starts_at).format("MMMM DD, YYYY hh:mm A")}
                        {row.ends_at ? <> - {moment(row.ends_at).format("MMMM DD, YYYY hh:mm A")} </> : ""}
                      </div>
                      <div className={index.spacer} />
                      {row.address}
                      <div className={index.spacer} />
                      {row.description}
                      <div className={index.spacer} />
                    </div>
                  </Link>
                  <div className={index.buttonBody}>
                    <Button className={`${index.button} ${index.add}`} href={google({
                      title: row.name,
                      description: row.description,
                      start: row.starts_at,
                      end: row.ends_at ?? row.starts_at
                    })}
                      target="_blank"
                      rel="noreferrer" variant="contained">
                      Add to calendar
                    </Button>
                    <SocialLinks eventId={row.id} />
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}