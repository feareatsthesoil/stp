import { useRouter } from "next/router"
import CalendarEvent from "../../Components/Calendar/CalendarEvent"
import React from "react"
import { useEvent } from "../../redux/hooks"
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
