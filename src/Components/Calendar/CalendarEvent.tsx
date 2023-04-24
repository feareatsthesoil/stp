import { CalendarEventType } from "../../types/index"
import css from "./CalendarEvent.module.css"
import moment from "moment"
import Map from "./Map"
import { google } from 'calendar-link'
import { Wrapper } from "@googlemaps/react-wrapper"
import { Button } from "@mui/material"
import SocialLinks from "../SocialLinks/SocialLinks"

export function CalendarEventComponent(params: { row: CalendarEventType }): JSX.Element {
  const row: CalendarEventType = params.row

  return (
    <div className={css.body}>
      <h1>{row.name}</h1>
      <div>
        <p>
          {row.address}
        </p>
        <p>
          {moment(row.starts_at).format("MMMM DD, YYYY")}
          &nbsp;
          {moment(row.starts_at).format("hh:mm A")}
          {row.ends_at && row.ends_at !== "" && <>
            &nbsp;to&nbsp;
            {moment(row.ends_at).format("MMMM DD, YYYY")}
            &nbsp;
            {moment(row.ends_at).format("hh:mm A")}
          </>}
        </p>
        <p>
          {row.description}
        </p>
        <p>
          Contact: {row.email}
        </p>
        <div className={css.map}>
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} >
            <Map address={row.address} />
          </Wrapper>
        </div>
        <div className={css.buttonBody}>
          <SocialLinks eventId={row.id} />
          <Button className={css.button} href={google({
            title: row.name,
            description: row.description,
            start: row.starts_at,
            end: row.ends_at ?? row.starts_at
          })}
            target="_blank"
            rel="noreferrer" variant="contained">
            Add to calendar
          </Button>
          <Button className={css.button} href={`http://google.com/maps/search/${row.address}`}
            target="_blank"
            rel="noreferrer" variant="contained">
            Open in map
          </Button>

        </div>
      </div>
    </div >
  )
}

export default CalendarEventComponent