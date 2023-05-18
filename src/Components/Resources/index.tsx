import { useAuth } from "@clerk/nextjs";

import css from "../../styles/Resources.module.css";
import { useResources } from "../../redux/hooks"
import DeleteResourceButton from "./DeleteResourceButton";

export default function ResourcesList() {
    const resources = useResources()
    const { userId } = useAuth()
    const sortResources = [...resources].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <>
            {sortResources.map((resource) => (
                <div key={resource.id} className={css.item}>
                    <div className={css.name}>
                        <p>  <strong>{resource.name}</strong></p>
                    </div>
                    <div>
                        <p>
                            <a target="webapp-tab" href={resource.link} className={css.link}>
                                {resource.link}
                            </a>
                        </p>
                    </div>
                    {userId === resource.userId ?
                        <div>
                            <DeleteResourceButton id={resource.id} />
                        </div>
                        : null}

                </div>
            ))}
        </>
    )
}