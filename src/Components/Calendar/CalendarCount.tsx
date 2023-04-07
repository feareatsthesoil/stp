import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
import { useEvents } from "../../redux/hooks";
import { eventsSelector } from "../../redux/slices/calendar";

export default function CalendarCount(){
 
    const count= useEvents(false).length

    return <Chip color="primary"  label={count} />
}