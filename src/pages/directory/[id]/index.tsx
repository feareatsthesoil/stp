import { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "@clerk/nextjs"
import { Button, Divider } from "@mui/material"

import css from "src/styles/Submit.module.css"
import { useContact } from "../../../redux/hooks"
import AuthLayout from "../../../Components/Layouts/AuthLayout"

export default function DirectoryShow() {
    const router = useRouter()
    const { id } = router.query
    const { userId } = useAuth()
    const contact = useContact(id as string)
    if (!contact) {
        return <></>
    }
    return (
        <AuthLayout>
            <div className={css.wrapper}>
                <div className={css.box}>
                    <h1>{contact.name} {contact.pronouns && <>( {contact.pronouns})</>}</h1>
                </div>
                <div>
                    {contact.address}
                </div>
                {contact.category && <div>
                    {contact.category}
                </div>}
                {contact.instagram && <div>
                    {contact.instagram}
                </div>}
                {contact.website && <div>
                    {contact.website}
                </div>}
                {contact.twitter && <div>
                    {contact.twitter}
                </div>}
                {contact.phone && <div>
                    {contact.phone}
                </div>}
                {contact.email && <div>
                    {contact.email}
                </div>}
                <Divider />
                {contact.description && <div>
                    <h2>Bio</h2>
                    {contact.description}
                </div>}
                {userId === contact.userId && <Button component={Link} href={`/directory/${contact.id}/edit`} size="small">Edit</Button>}
            </div>
        </AuthLayout>
    )
}
