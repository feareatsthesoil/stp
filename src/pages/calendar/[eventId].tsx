import React from "react"
import { useRouter } from "next/router"

import { useEvent } from "../../redux/hooks"
import CalendarEvent from "../../Components/Calendar/CalendarEvent"
import DefaultLayout from "../../Components/Layouts/DefaultLayout"

export default function EventPage() {
  const router = useRouter()
  const eventId = router.query.eventId as string
  const event = useEvent(eventId)

  return (
    <DefaultLayout>
      {event && <>
        {event
          ? <CalendarEvent row={{ ...event, index: parseInt(eventId) - 1 }} />
          : <p>Event not found</p>
        }
      </>}
    </DefaultLayout>
  )
}
