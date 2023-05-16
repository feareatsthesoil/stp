import { useContext } from "react";
import router from "next/router";
import Link from "next/link";
import { Box } from "@mui/system";
import { Alert, AlertTitle } from "@mui/material";

import css from "src/styles/Submit.module.css";
import { UserContext } from "../../Components/UserContext";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import CalendarForm from "../../Components/Calendar/CalendarForm";

export default function CalendarSubmit() {
  const userData = useContext(UserContext);
  return (
    <AuthLayout>
      <div className={css.wrapper}>
        <div className={css.box}>
          <h1>Add to Calendar</h1>
        </div>
        {userData.isMember && (
          <CalendarForm
            after={(eventId) => {
              console.log("event id ", eventId);
              router.push(`/calendar/${eventId || ""}`);
            }}
            profile={false}
          />
        )}
        {!userData.isMember && (
          <Box>
            <Alert color="warning">
              <AlertTitle>
                <strong>Members Only</strong>
              </AlertTitle>
              <AlertTitle>
                You must be a member to submit to the calendar. Sign up{" "}
                <Link href="/membership">here</Link>.
              </AlertTitle>
            </Alert>
          </Box>
        )}
      </div>
    </AuthLayout>
  );
}
