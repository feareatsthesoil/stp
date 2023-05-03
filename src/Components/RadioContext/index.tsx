import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import axios from "axios";

export interface RadioMetadata {
    artwork: string
    title: string
}
export interface RadioContextState {
    playing: boolean,
    play: () => void,
    pause: () => void,
    toggle: () => void,
    metadata?: RadioMetadata,
    total: number,
    current: number,
    volume: number,
    setVolume: (vol: number) => void
    history: { title: string }[]
}

export const RadioContext = createContext<RadioContextState>({ playing: false, play: () => { }, pause: () => { }, toggle: () => { }, metadata: undefined, total: 0, current: 0, volume: 0.6, setVolume: () => { }, history: [] })

export const RadioProvider = (props: { children: ReactNode }) => {

    const [metadata, setMetadata] = useState<{ title: string, artwork: string }>()
    const [volume, setVolume] = useState<number>(0.6)

    const [currentState, setCurrentState] = useState<"playing" | "paused">("paused")

    const [history, setHistory] = useState([])

    const [totalTime, setTotalTime] = useState(50)
    const [currentTime, setCurrentTime] = useState(20)
    const song = useMemo(() => typeof Audio !== "undefined" ? new Audio("https://streaming.radio.co/s3546f3b2b/listen") : undefined, [])


    const loadMetadata = () => {
        axios.get("https://public.radio.co/stations/s3546f3b2b/status").then(({ data }) => {
            setMetadata({
                title: data.current_track.title,
                artwork: data.current_track.artwork_url_large,
            })
            setHistory(data.history)
        })
    }
    useEffect(() => {
        if (!song) return
        song.volume = volume
    }, [volume])

    useEffect(() => {
        if (!song)
            return
        song.preload = "auto"

        const interval = setInterval(() => {

            setCurrentTime(song.currentTime)
            setTotalTime(song.currentTime)

            const actualState = song.paused ? "paused" : "playing"
            if (actualState !== currentState) {

                setCurrentState(actualState)
            }
        }, 500)
        return () => {
            clearInterval(interval)
        }

    }, [currentState])

    useEffect(() => {
        if (!song)
            return
        song.preload = "auto"
        const interval = setInterval(loadMetadata, 5000)
        loadMetadata()

        return () => {
            clearInterval(interval)
            song.pause()
        }

    }, [])

    useEffect(() => {
        if (!song)
            return
        currentState === "playing" ? song.play() : song.pause()
    }, [currentState])

    const toggleState = () => {
        setCurrentState(currentState == "playing" ? "paused" : "playing")
    }

    const state = { playing: currentState === "playing", volume, setVolume, toggle: toggleState, play: () => setCurrentState("playing"), pause: () => setCurrentState("paused"), total: totalTime, current: currentTime, metadata, history }
    return <RadioContext.Provider value={state}>
        {props.children}
    </RadioContext.Provider>
}