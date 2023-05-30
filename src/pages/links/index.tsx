import { useConfirm } from "material-ui-confirm";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

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

    return (<>
        <div className="bg-[#F4F4FE]">
            <DefaultLayout>
                <div className="w-[96vw] border-[0] mt-[-18px] ml-[-2vw] p-5 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm text-center">
                    <p>
                        All links are submitted by the Serving the People  community.  All submissions are subject to review.&nbsp;
                    </p>
                    <Link
                        className="text-blue-600 underline hover:text-indigo-600"
                        href="#"
                        onClick={handleClick}
                    >
                        Submit link
                    </Link>
                </div>
                <div className="py-5">
                    <ResourcesList />
                </div>
            </DefaultLayout>
        </div>
    </>
    )
}
