import Link from "next/link"
import DirectoryForm from "../../../Components/Directory/DirectoryForm"
import css from "src/styles/Submit.module.css"
import AuthLayout from "../../../Components/Layouts/AuthLayout"
import { useContext } from "react"
import { UserContext } from "../../../Components/UserContext"
import { Box } from "@mui/system"
import { Alert, AlertTitle, Button, Divider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContact } from "../../../redux/hooks"
import DeleteButton from "../../../Components/Directory/DeleteButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe, faMailReply, faMap, faPerson, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useAuth } from "@clerk/nextjs"
export default function DirectoryShow() {
    const userData = useContext(UserContext)
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
