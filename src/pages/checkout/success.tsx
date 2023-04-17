import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import DefaultLayoutCentered from "../../Components/Layouts/DefaultLayoutCentered";

export default function CheckoutSuccess() {
    const [verifying, setVerifying] = useState(true)
    const [verified, setVerified] = useState<boolean>()
    const router = useRouter()
    const { success, id } = useRouter().query
    const verifyPurchase = async function (id: string) {
        const response = await axios.post("/api/checkout/verify", { id })
        if (response.data.success) {
            setVerifying(false)
            setVerified(true)
        } else {
            setVerifying(false)
            alert("Payment failed")
        }
    }
    useEffect(() => {
        if (id) {
            verifyPurchase(id as string)
        }
    }, [id])

    return (
        <DefaultLayoutCentered>
            {verifying && <h2>Verifying your payment...</h2>}
            {verified &&
                <>
                    Thank you for subscribing!
                </>}
        </DefaultLayoutCentered>
    )
}