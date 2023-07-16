import { useAuth } from "@clerk/nextjs";
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CalendarForm from "../../../Components/Calendar/CalendarForm";
import DeleteEventButton from "../../../Components/Calendar/DeleteEventButton";
import AuthLayout from "../../../Components/Layouts/AuthLayout";
import DefaultLayout from "../../../Components/Layouts/DefaultLayout";
import { UserContext } from "../../../Components/UserContext";
import { CalendarRow } from "../../../types";

export default function CalendarEdit() {
  const userData = useContext(UserContext);
  const { userId } = useAuth();
  const router = useRouter();
  const { eventId } = router.query;
  const [data, setData] = useState<CalendarRow>();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (!eventId) return () => {};
    axios.get("/api/calendar/" + eventId).then(({ data }) => {
      setData(data);
    });
  }, [eventId]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!data) return <DefaultLayout>Loading...</DefaultLayout>;
  return (
    <AuthLayout>
      <div className="m-4 flex h-[70vh] flex-col place-content-center items-center">
        <div className="pb-10 text-xl font-bold">
          <h1>Add to Calendar</h1>
        </div>
        {userData.isMember && (
          <CalendarForm data={data} after={() => router.push("/calendar")} />
        )}
        {userData.isMember && userId == data?.userId && (
          <div
            style={{
              marginTop: "-57px",
              marginLeft: windowWidth >= 665 ? "520px" : "calc(100% - 60px)",
            }}
          >
            <DeleteEventButton
              id={data.id}
              after={() => router.push("/calendar")}
            />
          </div>
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
