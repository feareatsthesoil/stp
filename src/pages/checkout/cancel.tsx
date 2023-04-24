import Link from "next/link";
import DefaultLayoutCentered from "../../Components/Layouts/DefaultLayoutCentered";
import css from "../../styles/Contact.module.css"

export default function checkoutCancel() {
    return (
        <DefaultLayoutCentered>
            <div className={css.box}>
                <h1>Payment cancelled.</h1>
                <p>You can try again <Link href="/login">here</Link></p>
            </div>
        </DefaultLayoutCentered>
    )
}