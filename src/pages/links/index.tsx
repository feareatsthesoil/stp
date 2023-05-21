import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

import css from "../../styles/Resources.module.css"
import { Resource } from "../../types";
import { UserContext } from "../../Components/UserContext";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import ResourcesList from "../../Components/Resources";

export default function () {
    const { loggedIn } = useContext(UserContext)
    const confirm = useConfirm()
    const router = useRouter()
    const id = router.query
    const [data, setData] = useState<Resource>()

    useEffect(() => {
        if (!id)
            return () => { }
        axios.get("/api/resources/" + id).then(({ data }) => {
            setData(data)
        })
    }, [id])

    const handleClick = () => {
        if (!loggedIn) {
            return confirm({
                title: "Please log in",
                description: "Please log in to submit to links.", confirmationText: "Log in"
            }).then(() => {
                router.push("/login?redirect_url=/links")
            })
        } else {
            return router.push("/links/submit")
        }
    }

    return (
        <DefaultLayout>
            <div className={css.wrapper}>
                <h1>Links</h1>
                <p>
                    By submitting to links you are agreeing to our <Link style={{ color: "#0047FF", textDecoration: "underline" }} href="#">Privacy Policy</Link>.
                </p>
                <Button
                    className={css.button}
                    onClick={handleClick}>
                    Submit
                </Button>
            </div>
            <div className={css.list}>
                <ResourcesList />
            </div>
        </DefaultLayout>
    )
}
