import { useRouter } from "next/router";

import css from "../../styles/Submit.module.css"
import ResourcesForm from "../../Components/Resources/resourcesForm";
import AuthLayout from "../../Components/Layouts/AuthLayout";

export default function () {
    const router = useRouter()
    return <AuthLayout>
        <div className={css.resourceWrapper}>
            <div className={css.box}>
                <h1>Add to Resources</h1>
            </div>
            <ResourcesForm after={() => router.push("/resources")} />
        </div>
    </AuthLayout>
}