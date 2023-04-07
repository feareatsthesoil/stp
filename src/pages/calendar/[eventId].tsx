import { CalendarRow } from "../../types"

import { useRouter } from "next/router"
import CalendarEvent from "../../Components/Calendar/CalendarEvent"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import Nav from "../../Components/Nav/Nav"
import React from "react"

import { useEvent } from "../../redux/hooks"

export default function EventPage() {
  const router = useRouter()
  
  
  const eventId = router.query.eventId as string

  const event = useEvent(eventId)
  
 

  return (
    <>
      <div className="body">
        <Header />
        <Nav />
        <div className="subBody">
          {/* <div className="box"> */}
            {event && <>
              {event
                ? <CalendarEvent row={{ ...event, index: parseInt(eventId) - 1 }} />
                : <p>Event not found</p>
              }
            </>}

          {/* </div> */}
        </div>
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
 

  return {
    props: {
      events: [],
    },
  }
}
