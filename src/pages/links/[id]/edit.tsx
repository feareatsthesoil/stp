import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import css from "src/styles/Submit.module.css"
import DefaultLayout from "../../../Components/Layouts/DefaultLayout";
import { UserContext } from "../../../Components/UserContext";
import { Resource } from "../../../types";
import axios from "axios";
import DefaultLayoutCentered from "../../../Components/Layouts/DefaultLayoutCentered";
import AuthLayout from "../../../Components/Layouts/AuthLayout";
import ResourcesForm from "../../../Components/Resources/resourcesForm";
import DeleteResourceButton from "../../../Components/Resources/DeleteResourceButton";
import { useAuth } from "@clerk/nextjs";
import { Alert, AlertTitle, Box, Link } from "@mui/material";


export default function EditResource() {
    const userData = useContext(UserContext)
    const { userId } = useAuth()
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState<Resource>()
    useEffect(() => {
        if (!id)
            return () => { }
        axios.get("/api/resources/" + id).then(({ data }) => {
            setData(data)
        })
    }, [id])
    if (!data)
        return <DefaultLayoutCentered>Loading...</DefaultLayoutCentered>
    return <AuthLayout>
        <div className={css.wrapper}>
            <div className={css.box}>
                <h1>Add to Calendar</h1>
            </div>
            {userData.isMember && data &&
                <ResourcesForm data={data} after={() => router
                    .push("/resources")} />
            }
            {userId == data?.userId &&
                <div className={css.delete}>
                    <DeleteResourceButton id={data.id} after={() => router
                        .push("/resources")} />
                </div>
            }
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
}