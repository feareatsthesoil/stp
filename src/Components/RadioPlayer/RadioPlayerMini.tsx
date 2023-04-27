import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Grid, LinearProgress, Link, Slider, Stack } from "@mui/material";

import { useContext, } from "react";
import { faPlay, faPause, faVolumeDown, } from '@fortawesome/free-solid-svg-icons'

import css from "./RadioPlayer.module.css";

import { RadioContext } from "../RadioContext";
import { useRouter } from "next/router";
const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return minutes.toString().padStart(2, '0') + ":" + remaining.toString().padStart(2, '0')
}
export default function RadioPlayerMini() {

    const router = useRouter()
    const currentRoute = router.pathname;
    const { playing, volume, setVolume, total, toggle, current, metadata } = useContext(RadioContext)

    return <>
        <div className={css.wrapper}>
            <Grid className={playing && currentRoute != "/radio" ? css.fadeIn : css.fadeOut} spacing={1} container sx={{ height: "100%", width: "auto", alignItems: "center", justifyContent: "center" }}>
                <Grid item xs={12} sm={2} sx={{ height: 100, display: "flex", justifyContent: "center" }}>
                    <Link href="/radio">
                        <Avatar className={playing ? css.spin : ""} src={metadata?.artwork ?? "/favicon.ico"} sx={{ height: 80, width: 80 }} />
                    </Link>
                </Grid>
                <Grid xs={1} sm={1} item>
                    <Button onClick={toggle} >
                        <FontAwesomeIcon size="2x" color="black" icon={!playing ? faPlay : faPause} />
                    </Button>
                </Grid>
                <Grid item xs={2} sm={1}>
                    <div style={{ textAlign: "center" }}>{formattedTime(current)}</div>
                </Grid>
                <Grid item xs={10} sm={5} sx={{ height: "100%" }} >
                    <Stack justifyContent={"center"} sx={{ height: "100%" }} >

                        <div style={{ textAlign: "center" }}>{metadata?.title}</div>

                    </Stack>
                </Grid>
                <Grid item xs={10} sm={1}>
                    <Stack direction={"row"} spacing={2} alignItems="center">
                        <Slider size="small" max={1} min={0} value={volume} onChange={(ev, val) => { setVolume(val as number) }} step={0.001} sx={{ ".MuiSlider-thumb.Mui-focusVisible": { boxShadow: "0px 0px 0px 8px #00000031 !important" }, "&:hover .MuiSlider-thumb": { boxShadow: "0px 0px 0px 8px #00000031 !important" }, color: "#000" }} />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    </>
}