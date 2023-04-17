import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";


export default function JoinButton() {
    const { loggedIn } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const confirm = useConfirm()
    const router = useRouter()
    const handleClick = () => {
        if (!loggedIn) {
            return confirm({ title: "Please login", description: <>Please login before purchasing a membership. <Link href="/login">Login</Link></>, confirmationText: "Login" }).then(() => {
                router.push("/login")
            })
        }
        setLoading(true)
        axios.post("/api/checkout/create").then((response) => {
            window.location.replace(response.data.redirect)

        }).catch(() => {
            confirm({ title: "Unsuccessful", description: "Unable to purchase a membership due to a server error. Please contact us with details of this issue.", confirmationText: "Contact" }).then(() => {
                router.push("/contact")
            })
        }).then(() => {
            setLoading(false)
        })
    }
    return <Button onClick={handleClick}>
        {!loading && <>Join Now!</>}
        {loading && <FontAwesomeIcon icon={faSpinner} spin />}
    </Button>
}