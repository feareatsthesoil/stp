import React from "react"

import Calendar from "../../Components/Calendar"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"

import calendar from "../../Components/Calendar/Calendar.module.css"

import { getCalendarData } from "../../libs/sheets"
import { CalendarRow } from "../../types"

export default function IndexPage({ calendarData }: { calendarData: CalendarRow[] }) {

  return (
    <>
      <div className={calendar.body}>
        <Header />
        <div className={calendar.box}>
          <Calendar data={calendarData} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const calendarData = await getCalendarData()

  return {
    props: {
      calendarData,
    },
  }
}
