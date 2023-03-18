import { CalendarRow } from "../../types"
import { getCalendarData } from "../../libs/sheets"
import { useRouter } from "next/router"
import CalendarEvent from "../../Components/Calendar/CalendarEvent"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import Nav from "../../Components/Nav/Nav"
import React, { useEffect, useState } from "react"
import axios from "axios"

export default function EventPage() {
  const router = useRouter()
  const [events, setEvents] = useState<CalendarRow[]>([])
  const eventId = router.query.eventId as string
  const event = events.find((row) => row.id == eventId)
  useEffect(()=>{
    async function getData (){
      const {data} = await (axios.get<CalendarRow[]>("/api/calendar"))
      setEvents(data)
    }
    getData()
  
  }, [])

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
