import React from "react"
import Calendar from "../../Components/Calendar"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import calendar from "../../Components/Calendar/Calendar.module.css"
import { getCalendarData } from "../../libs/sheets"
import { CalendarRow } from "../../types"
import Nav from "../../Components/Nav/Nav"
import styled from "styled-components";
import Link from "next/link"





export default function IndexPage({ calendarData }: { calendarData: CalendarRow[] }) {


  return (
    <>
      <div className={calendar.body}>
        <Header />
        <Nav />
        <div className="subBody">
          <div className={calendar.box}>
            <div className={calendar.header}>
              <h1 id="top">2023 Calendar</h1>
              <div className={calendar.bio}>
                <p>
                  To <Link href="/calendar/submit">submit</Link> to the calendar please <Link href="/login">log in</Link>.
                  All submissions are subject to review. If you would like to receive updates
                  you can sign up for our <Link href="#"> newsletter</Link> or <Link
                    href="https://calendar.google.com/calendar/u/0?cid=anZhcmR5QHphdmFsLmNv"
                    target="webapp-tab"
                  >
                    add calendar
                  </Link>.
                </p>
                <p>
                  By submitting to the calendar you are agreeing to our <Link href="#">Privacy Policy</Link>
                </p>
              </div>
            </div>
            <Calendar data={calendarData} />
          </div>
        </div>
        <Nav />
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