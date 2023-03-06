import React from "react"
import { useRouter } from "next/router"
import CalendarEvent from "../../Components/Calendar/CalendarEvent"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import { getCalendarData } from "../../libs/sheets"
import { CalendarRow } from "../../types"
import Nav from "../../Components/VerticalNav/Nav"

export default function EventPage({ events }: { events: CalendarRow[] }) {
  const router = useRouter()
  const eventId = router.query.eventId as string

  const event = events.find((row) => row.id == eventId)

  return (
    <>
      <div className="body">
        <Header />
        <Nav />
      <div className="subBody">
        <div className="box">
          {event
            ? <CalendarEvent row={{ ...event, index: parseInt(eventId) - 1 }} />
            : <p>Event not found</p>
          }
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const calendarData = await getCalendarData()
  const data = calendarData.slice(0, calendarData.length)

  return {
    props: {
      events: data,
    },
  }
}
