import { useAuth } from "@clerk/nextjs";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Button, Link } from "@mui/material";
import { google } from "calendar-link";
import moment from "moment";
import { CalendarEventType } from "../../types/index";
import SocialLinks from "../SocialLinks/SocialLinks";
import css from "./CalendarEvent.module.css";
import Map from "./Map";

export function CalendarEventComponent(params: {
  row: CalendarEventType;
}): JSX.Element {
  const row: CalendarEventType = params.row;
  const { userId } = useAuth();

  return (
    <div className={css.wrapper}>
      <h1>{row.name}</h1>
      <div className={css.info}>
        {row.address && <p>{row.address}</p>}
        <p>
          {moment(row.starts_at).format("MMMM DD, YYYY")}
          &nbsp;
          {moment(row.starts_at).format("hh:mm A")}
          {row.ends_at && row.ends_at !== "" && (
            <>
              &nbsp;to&nbsp;
              {moment(row.ends_at).format("MMMM DD, YYYY")}
              &nbsp;
              {moment(row.ends_at).format("hh:mm A")}
            </>
          )}
        </p>
        {row.description && <p>{row.description}</p>}
        {row.website && (
          <p>
            <Link
              target="webapp-tab"
              href={row.website}
              sx={{
                color: "#0047ff",
              }}
            >
              {row.website}
            </Link>
          </p>
        )}
        {row.email && <p>Contact: {row.email}</p>}
        <div className={css.buttonWrapper}>
          <Button
            sx={{
              float: "right",
              backgroundColor: "rgb(239, 239, 239)",
              textTransform: "none",
              fontFamily: "Helvetica",
              fontWeight: "normal!important",
              fontSize: ".9em!important",
              borderRadius: "4px",
              color: "#000",
              border: "1px solid #000",
              height: "31.8px!important",
              margin: "5px 10px 5px 1px",
              "&:hover ": {
                backgroundColor: "rgb(220, 220, 220) !important;",
              },
            }}
            color="secondary"
            variant="contained"
            href={google({
              title: row.name,
              description: row.description,
              start: row.starts_at,
              end: row.ends_at ?? row.starts_at,
            })}
            target="_blank"
            rel="noreferrer"
          >
            Add to calendar
          </Button>
          {row.address && (
            <Button
              sx={{
                float: "right",
                backgroundColor: "rgb(239, 239, 239)",
                textTransform: "none",
                fontFamily: "Helvetica",
                fontWeight: "normal!important",
                fontSize: ".9em!important",
                borderRadius: "4px",
                color: "#000",
                border: "1px solid #000",
                height: "31.8px!important",
                margin: "5px 160px 20px 0",
                "&:hover ": {
                  backgroundColor: "rgb(220, 220, 220) !important;",
                },
              }}
              color="secondary"
              variant="contained"
              href={`http://google.com/maps/search/${row.address}`}
              target="_blank"
              rel="noreferrer"
            >
              Open in map
            </Button>
          )}
          {userId === row.userId ? (
            <Link
              sx={{ textDecoration: "none!important" }}
              className={css.editLink}
              href={`/calendar/${row.id}/edit`}
            >
              <Button className={`${css.button} ${css.edit}`}>Edit</Button>
            </Link>
          ) : null}
        </div>
      </div>
      {row.address && (
        <div className={css.map}>
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map address={row.address} />
          </Wrapper>
        </div>
      )}
      <SocialLinks eventURL={`${window.location.href}/${row.id}`} />
    </div>
  );
}

export default CalendarEventComponent;
