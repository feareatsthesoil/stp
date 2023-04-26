import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Grid, LinearProgress } from "@mui/material";

import { useContext, } from "react";
import { faPlay, faPause, } from '@fortawesome/free-solid-svg-icons'

import { RadioContext } from "../RadioContext";
const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return minutes.toString().padStart(2, '0') + ":" + remaining.toString().padStart(2, '0')
}
export default function RadioPlayer() {



    const { playing, total, toggle, current, metadata } = useContext(RadioContext)
    return <>
        <Grid container sx={{ height: "100%", width: "100%", paddingTop: "40px" }}>
            <Grid item xs={12} >

                <Grid item xs={12} sx={{ height: 300, display: "flex", justifyContent: "center" }}>
                    <Avatar className={playing ? "spin" : ""} src={metadata?.artwork ?? "/favicon.ico"} sx={{ height: 300, width: 300, }} />
                </Grid>
                <Grid item xs={12} sx={{ padding: "10px 0 0 0", textAlign: "center" }}>
                    {formattedTime(current)}
                </Grid>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={6} sm={12} sx={{ padding: "10px 0 0 0", textAlign: "center" }}>
                        {metadata?.title}
                        <LinearProgress variant="determinate" value={100} />
                    </Grid>


                </Grid>
            </Grid>
            <Grid xs={12} item>
                <Button onClick={toggle} sx={{ margin: "50px 0 0 0" }}>
                    <FontAwesomeIcon size="2x" color="black" icon={!playing ? faPlay : faPause} />
                </Button>
            </Grid>
        </Grid>
    </>
}

//<script src="https://embed.radio.co/player/822c48c.js"></script>

