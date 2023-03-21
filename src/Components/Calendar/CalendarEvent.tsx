import Link from "next/link"
import { CalendarEventType } from "../../types/index"
import calendar from "./Calendar.module.css"
import GoogleMapReact from 'google-map-react'
import moment from "moment"
import Map from "./Map"
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'next-share'
import { Wrapper } from "@googlemaps/react-wrapper"

export  function CalendarEventComponent(params: { row: CalendarEventType }): JSX.Element {
  const row: CalendarEventType = params.row

  return (
    <div className={calendar.eventBody}>
      <div className={calendar.box}>
        <div className={calendar.eventHeader}><h1>{row.name}</h1></div>
        <div>
          <p>
            {row.location}
          </p>
          <p>
            {moment(row.start_date, "MM/DD/YYYY").format("MMMM DD, YYYY")}
            <div className={calendar.spacer}></div>
            {row.start_time} {" "} - {row.end_date} {row.end_time}
          </p>
          <div className={calendar.bottom}>
            {row.description}
            <div className={calendar.spacer}></div>
            Contact: {row.email}
          </div>
          <div className={calendar.add}>
            <Link
              href="https://calendar.google.com/calendar/u/0?cid=anZhcmR5QHphdmFsLmNv"
              target="webapp-tab"
            >
              Add to calendar
            </Link>
            <div className={calendar.spacer}></div>
            <a target="webapp-tab" href={`http://google.com/maps/search/${row.location}`}>Open in maps</a>
            <div className={calendar.spacer}></div>
            <div className={calendar.spacer}></div>
          </div>
          <div className={calendar.map}>
            {/* <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${row.location}&zoom=14&size=400x400&key=AIzaSyADQiUQ0oZvputuDNyiCdeLYcx06Gsa-3g&markers=${row.location}`} /> */}
            {/* <div style={{height: "1000px", width:1000}}>
              <Wrapper apiKey="">
                <GoogleMapReact
              </Wrapper>
          </div>
          <div className={calendar.eventSocialsBody}> */}
          <Wrapper apiKey="AIzaSyADQiUQ0oZvputuDNyiCdeLYcx06Gsa-3g" >
            <Map address={row.location} />

            
          </Wrapper>

            <TwitterShareButton
              url={`https://stp-next-app-main.vercel.app/calendar/${row.id}`} >
              <div className={calendar.eventSocials}>
                <TwitterIcon size={25} round />
              </div>
            </TwitterShareButton>

            <FacebookShareButton
              url={`https://stp-next-app-main.vercel.app/calendar/${row.id}`} >
              <div className={calendar.eventSocials}>

                <FacebookIcon size={25} round />
              </div>
            </FacebookShareButton>

            <RedditShareButton
              url={`https://stp-next-app-main.vercel.app/calendar/${row.id}`} >
              <div className={calendar.eventSocials}>
                <RedditIcon size={25} round />
              </div>
            </RedditShareButton>

            <WhatsappShareButton
              url={`https://stp-next-app-main.vercel.app/calendar/${row.id}`} >
              <div className={calendar.eventSocials}>
                <WhatsappIcon size={25} round />
              </div>
            </WhatsappShareButton>

            <EmailShareButton id={calendar.button}
              url={`https://stp-next-app-main.vercel.app/calendar/${row.id}`} >
              <div className={calendar.eventSocials}>
                <EmailIcon size={25} round />
              </div>
            </EmailShareButton>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarEventComponent