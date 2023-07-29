import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import router from "next/router";
import { useContext } from "react";
import CalendarForm from "../../Components/Calendar/CalendarForm";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import { UserContext } from "../../Components/UserContext";

export default function CalendarSubmit() {
  const userData = useContext(UserContext);
  return (
    <AuthLayout>
      <div className="m-4 flex h-[70vh] flex-col place-content-center items-center">
        <div className="pb-10 text-xl font-bold">
          <h1>Add to Calendar</h1>
        </div>
        {userData.isMember && (
          <CalendarForm
            after={(eventId) => {
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
                <Link className="underline" href="/membership">
                  here
                </Link>
                .
              </AlertTitle>
            </Alert>
          </Box>
        )}
      </div>
    </AuthLayout>
  );
}
