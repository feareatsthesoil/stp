import Link from "next/link"
import { CalendarEventType } from "../../types/index"
import calendar from "./Calendar.module.css"
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

export default function CalendarEvent(params: { row: CalendarEventType }): JSX.Element {
  const row: CalendarEventType = params.row
  return (
    <div className={calendar.eventBody}>

      <div className={calendar.box}>
        <div className={calendar.back}><Link href="/calendar">Back</Link></div>
        <div className={calendar.eventHeader}><h1>{row.name}</h1></div>
        <div>
          <p>
            <strong>Type:</strong> {row.type}
          </p>
          <p>
            <strong>Time:</strong> {row.start_date} {row.start_time} {" "}
            - {row.end_date} {row.end_time}
          </p>
          <p>
            <strong>Location:</strong> {row.location}
          </p>
          <p>
            <strong>Contact:</strong> {row.email}
          </p>
          <Link href="https://calendar.google.com/calendar/u/0?cid=anZhcmR5QHphdmFsLmNv" target="webapp-tab">Add to calendar</Link>

          <div className={calendar.eventSocialsBody}>

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
