import { useContext, } from "react";
import { Stack } from "@mui/system";
import { Avatar, Button, Grid, Slider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import css from "./RadioPlayer.module.css";
import { RadioContext } from "../RadioContext";

const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return minutes.toString().padStart(2, '0') + ":" + remaining.toString().padStart(2, '0')
}
export default function RadioPlayer() {
    const { playing, total, toggle, history, volume, setVolume, current, metadata } = useContext(RadioContext)
    return <>
        <Grid container
            sx={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                paddingTop: "40px"
            }}>
            <Grid item xs={12} >
                <Grid item xs={12}
                    sx={{
                        height: 300,
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <Avatar
                        className={playing ? css.spin : ""}
                        src={metadata?.artwork ?? "/favicon.ico"}
                        sx={{ height: 300, width: 300, }} />
                </Grid>
                <Grid item xs={12}
                    sx={{
                        padding: "10px 0 0 0",
                        textAlign: "center"
                    }}>
                    {formattedTime(current)}
                </Grid>
                <Grid item
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <Grid item xs={6} sm={12}
                        sx={{
                            padding: "10px 0 0 0",
                            textAlign: "center"
                        }}>
                        {metadata?.title}
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} item>
                <Button onClick={toggle} sx={{ margin: "50px 0 0 0" }} >
                    <FontAwesomeIcon size="2x" color="black"
                        icon={!playing ? faPlay : faPause} />
                </Button>
            </Grid>
            <Grid item xs={10} sx={{ alignItems: "center !important" }}>
                <Stack direction={"row"} spacing={1} alignItems="center">
                    <Slider max={1} min={0} value={volume} onChange={(ev, val) => { setVolume(val as number) }} step={0.001}
                        sx={{
                            "& .MuiSlider-thumb": {
                                boxShadow: "none !important"
                            },
                            "& .MuiSlider-thumb:before": {
                                boxShadow: "none !important"
                            },
                            "& .MuiSlider-rail": {
                                opacity: "1",
                                backgroundColor: "rgb(239, 239, 239)"
                            },
                            color: "#000",
                            "@media screen and (max-width: 450px)": {
                                display: "none",
                            }
                        }}
                    />
                </Stack>
            </Grid>
        </Grid>
    </>
}

