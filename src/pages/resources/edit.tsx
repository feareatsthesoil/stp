import { useContext } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import { UserContext } from "../../Components/UserContext";

export default function EditResource() {
    const userData = useContext(UserContext)
    const router = useRouter()
    const { id } = router.query
    return <DefaultLayout>
    </DefaultLayout>
}