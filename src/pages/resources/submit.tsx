import { useRouter } from "next/router";

import css from "../../styles/Submit.module.css"
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import ResourcesForm from "../../Components/Resources/resourcesForm";

export default function () {
    const router = useRouter()
    return <DefaultLayout>
        <div className={css.resourceWrapper}>
            <div className={css.box}>
                <h1>Add to Resources</h1>
            </div>
            <ResourcesForm after={() => router.push("/resources")} />
        </div>
    </DefaultLayout>
}