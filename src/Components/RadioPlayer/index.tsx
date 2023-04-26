import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, CardContent, CardHeader, Grid, LinearProgress, List, ListItem, ListItemText, Slider } from "@mui/material";

import { useContext, } from "react";
import { faPlay, faPause, faVolumeDown, } from '@fortawesome/free-solid-svg-icons'

import css from "./RadioPlayer.module.css";

import { RadioContext } from "../RadioContext";
import { Stack } from "@mui/system";
import { omit } from "lodash";
const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return minutes.toString().padStart(2, '0') + ":" + remaining.toString().padStart(2, '0')
}
export default function RadioPlayer() {
    const { playing, total, toggle, history, volume, setVolume, current, metadata } = useContext(RadioContext)
    return <>
        <Grid container sx={{ height: "100%", width: "100%", paddingTop: "40px" }}>
            <Grid item xs={12} >

                <Grid item xs={12} sx={{ height: 300, display: "flex", justifyContent: "center" }}>
                    <Avatar className={playing ? css.spin : ""} src={metadata?.artwork ?? "/favicon.ico"} sx={{ height: 300, width: 300, }} />
                </Grid>
                <Grid item xs={12} sx={{ padding: "10px 0 0 0", textAlign: "center" }}>
                    {formattedTime(current)}
                </Grid>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={6} sm={12} sx={{ padding: "10px 0 0 0", textAlign: "center" }}>
                        {metadata?.title}
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} item>
                <Button onClick={toggle} sx={{ margin: "50px 0 0 0" }}>
                    <FontAwesomeIcon size="2x" color="black" icon={!playing ? faPlay : faPause} />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={"row"} spacing={1} alignItems="center">
                    <Slider max={1} min={0} value={volume} onChange={(ev, val) => { setVolume(val as number) }} step={0.001} sx={{ ".MuiSlider-thumb.Mui-focusVisible": { boxShadow: "0px 0px 0px 8px #00000031 !important" }, "&:hover .MuiSlider-thumb": { boxShadow: "0px 0px 0px 8px #00000031 !important" }, color: "#000" }} />
                </Stack>
            </Grid>
        </Grid>

        <div>

            {/* <Card>
                <CardContent>
                    <CardHeader>
                        <h1>History</h1>
                    </CardHeader>
                    <List>{history?.map((item) => <ListItem key={item.title}><ListItemText primary={item.title} /></ListItem>)}</List>
                </CardContent>
            </Card> */}
        </div>
    </>
}

//<script src="https://embed.radio.co/player/822c48c.js"></script>

