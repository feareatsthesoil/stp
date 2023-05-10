import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { Box } from "@mui/system"
import { Alert, AlertTitle } from "@mui/material"
import axios from "axios"

import css from "src/styles/Submit.module.css"
import { CalendarRow } from "../../../types"
import { UserContext } from "../../../Components/UserContext"
import AuthLayout from "../../../Components/Layouts/AuthLayout"
import CalendarForm from "../../../Components/Calendar/CalendarForm"
import DeleteEventButton from "../../../Components/Calendar/DeleteEventButton"
import DefaultLayoutCentered from "../../../Components/Layouts/DefaultLayoutCentered"

export default function CalendarEdit() {
    const userData = useContext(UserContext)
    const { userId } = useAuth()
    const router = useRouter()
    const { eventId } = router.query
    const [data, setData] = useState<CalendarRow>()
    useEffect(() => {
        if (!eventId)
            return () => { }
        axios.get("/api/calendar/" + eventId).then(({ data }) => {
            setData(data)
        })
    }, [eventId])

    if (!data)
        return <DefaultLayoutCentered>Loading...</DefaultLayoutCentered>
    return (
        <AuthLayout>
            <div className={css.wrapper}>
                <div className={css.box}>
                    <h1>Add to Calendar</h1>
                </div>
                {userData.isMember &&
                    <CalendarForm data={data} after={() => router
                        .push("/calendar")} />}
                {userId == data?.userId &&
                    <div className={css.delete}>
                        <DeleteEventButton id={data.id} after={() => router
                            .push("/calendar")} />
                    </div>}
                {!userData.isMember &&
                    < Box>
                        <Alert color="warning">
                            <AlertTitle><strong>Members Only</strong></AlertTitle>
                            <AlertTitle>
                                You must be a member to submit to the calendar.
                                Sign up <Link href="/membership">here</Link>.
                            </AlertTitle>
                        </Alert>
                    </Box>}
            </div>
        </AuthLayout>
    )
}