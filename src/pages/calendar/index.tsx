import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";

import css from "../../Components/Calendar/Calendar.module.css";
import { CalendarRow } from "../../types";
import { UserContext } from "../../Components/UserContext";
import Calendar from "../../Components/Calendar";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function IndexPage({
  calendarData,
}: {
  calendarData: CalendarRow[];
}) {
  const { loggedIn, isMember } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();

  const handleClick = () => {
    if (!loggedIn) {
      return confirm({
        title: "Please log in",
        description: "Please log in to submit to the calendar.",
        confirmationText: "Log in",
      }).then(() => {
        router.push("/login?redirect_url=/calendar");
      });
    } else if (!isMember) {
      return confirm({
        title: "Members only",
        description: "Please get a membership to submit to the calendar.",
        confirmationText: "Membership",
      }).then(() => {
        router.push("/membership");
      });
    } else {
      return router.push("/calendar/submit");
    }
  };

  return (
    <DefaultLayout>
      <div className={css.header}>
        <h1>2023 Calendar</h1>
        <p>
          All submissions will be included in our weekly newsletter and are
          subject to review. By submitting to the calendar you are agreeing to
          our <Link href="#">Privacy Policy</Link>.
        </p>
        <div className={css.buttonWrapper}>
          <Button className={css.button} onClick={handleClick}>
            Submit to Calendar
          </Button>
          <Button
            className={css.button}
            href="https://calendar.google.com/calendar/u/1?cid=Y19mZDdkZGU5ZGY3MzBmM2Q5OTE5NjM1YmI0MzRiNDM4MTAxOGViZDg2MDY4NGUxN2ViMGU2NzAxMWY5OWIyNWYxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
            target="webapp-tab"
          >
            Add Calendar
          </Button>
        </div>
      </div>
      <Calendar />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/api/calendar`);
  return {
    props: {
      calendarData: data,
    },
  };
}
