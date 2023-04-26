import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Grid, LinearProgress, Stack } from "@mui/material";

import { useContext, } from "react";
import { faPlay, faPause, } from '@fortawesome/free-solid-svg-icons'

import { RadioContext } from "../RadioContext";
const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return minutes.toString().padStart(2, '0') + ":" + remaining.toString().padStart(2, '0')
}
export default function RadioPlayerMini() {


    const { playing, total, toggle, current, metadata } = useContext(RadioContext)
    return <>
        <Grid container sx={{ height: "100%", width: "100%" }}>


            <Grid item xs={2} sx={{ height: 100, display: "flex", justifyContent: "center" }}>
                <Avatar className={playing ? "spin" : ""} src={metadata?.artwork ?? "/favicon.ico"} sx={{ height: 100, width: 100, }} />
            </Grid>
            <Grid xs={1} item>
                <Button onClick={toggle} >
                    <FontAwesomeIcon size="6x" color="black" icon={!playing ? faPlay : faPause} />
                </Button>
            </Grid>

            <Grid item xs={8} sm={8} sx={{ height: "100%" }}  >
                <Stack justifyContent={"center"} sx={{ height: "100%" }} >
                    <div style={{ textAlign: "center" }}>{metadata?.title}</div>
                    <div><LinearProgress variant="determinate" value={100} /></div>
                    <div style={{ textAlign: "center" }}>{formattedTime(current)}</div>
                </Stack>
            </Grid>



        </Grid>
    </>
}

//<script src="https://embed.radio.co/player/822c48c.js"></script>

