import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useRef, useState } from "react";
import { faPlay, faPause, faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remaining = Math.floor(seconds % 60)

    return minutes.toString().padStart(2, '0') + ":" + remaining.toString().padStart(2, '0')
}
export default function RadioPlayer() {

    const playlist =
    {
        name: "Serving the People",
        artist: "Music for Everyone",
        src: "https://streaming.radio.co/s3546f3b2b/listen",
        thumbnail: "https://media.discordapp.net/attachments/979813711319552041/999455209749229618/c800-orange-green-ornettetwinslabels-copy.gif"
    }


    const [metadata, setMetadata] = useState<{ title?: string, artwork?: string }>({})

    const [currentState, setCurrentState] = useState<"playing" | "paused">("paused")

    const [totalTime, setTotalTime] = useState(50)
    const [currentTime, setCurrentTime] = useState(20)
    const song = useMemo(() => new Audio(playlist.src), [])

    const loadMetadata = () => {
        axios.get("https://public.radio.co/stations/s3546f3b2b/status").then(({ data }) => {
            setMetadata({
                title: data.current_track.title,
                artwork: data.current_track.artwork_url
            })
        })
    }
    loadMetadata();
    useEffect(() => {
        song.preload = "auto"

        const interval = setInterval(() => {

            setCurrentTime(song.currentTime)
            setTotalTime(song.currentTime)
            song.volume = 0.2

            const actualState = song.paused ? "paused" : "playing"
            if (actualState !== currentState) {

                setCurrentState(actualState)
            }
        }, 700)
        return () => {
            clearInterval(interval)
        }

    }, [currentState])

    useEffect(() => {
        song.preload = "auto"
        const interval = setInterval(loadMetadata, 2000)
        return () => {
            clearInterval(interval)
        }

    }, [])



    useEffect(() => {
        currentState === "playing" ? song.play() : song.pause()
    }, [currentState])


    const toggleState = () => {
        setCurrentState(currentState == "playing" ? "paused" : "playing")
    }
    return <>

        <Box sx={{ border: "1px solid black", width: 500, height: 100 }}>
            <Grid container sx={{ p: 2, height: "100%" }}>

                <Grid item sm={2}>
                    {metadata.artwork ? <Avatar className={currentState === "playing" ? "spin" : ""} src={metadata.artwork} sx={{ height: 70, width: 70 }} /> : ""}
                </Grid>
                <Grid item sm={10} sx={{ height: "100%" }}>

                    <Grid container sx={{ height: "100%" }} alignItems={"center"}>
                        <Grid item sm={12}>
                            Now Playing: {metadata?.title}
                        </Grid>
                        <Grid sm={2} item>

                            <Button onClick={toggleState}>
                                <FontAwesomeIcon size="2x" icon={currentState === "paused" ? faPlay : faPause} />
                            </Button>
                        </Grid>

                        <Grid sm={9} item>
                            {formattedTime(currentTime)}
                            <LinearProgress variant="determinate" value={100} />
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        </Box>
    </>
}

//<script src="https://embed.radio.co/player/822c48c.js"></script>

