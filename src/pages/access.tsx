import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { enqueueSnackbar } from "notistack"

import css from "../styles/Membership.module.css"
import { UserContext } from "../Components/UserContext"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const Membership = () => {
    const { initialized, purchase, isEdu } = useContext(UserContext)
    const { isLoaded, isSignedIn } = useUser()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (router.query.code && initialized) {
            setLoading(true)
            axios.get("/api/membership/grant?code=" + router.query.code).then(() => {
                enqueueSnackbar("You are now a member!")
                router.push("/")
            }).catch((err) => {
                setError(err?.response?.data?.message ?? "Something went wrong.")
            })
        }

    }, [router.query.code, isSignedIn, initialized])
    if (!initialized || !isLoaded)
        return
    <DefaultLayout>
        Loading...
    </DefaultLayout>
    return (
        <DefaultLayout>
            <div className={css.box}>
                <h1>Claim a one year membership</h1>
                {(purchase || isEdu) &&
                    <p>You are already a member</p>}
                {!isSignedIn &&
                    <p>Please&nbsp;
                        <Link
                            style={{ textDecoration: "underline" }}
                            href={`/login?redirect_url=${encodeURI(router.asPath)}`}>log in</Link> to claim.
                    </p>}
                {isSignedIn && !purchase && loading &&
                    <p>Please wait. If it takes too long, refresh the page.</p>}
                {error}
                {(!router.query.code || router.query.code === "") &&
                    <p>Invalid URL</p>}
            </div>
        </DefaultLayout>
    )
}

export default Membership