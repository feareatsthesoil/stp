import React, { useContext } from "react"
import { useRouter } from "next/router";
import Button from "@mui/material/Button"
import { useConfirm } from "material-ui-confirm";

import css from "../styles/Discussion.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"
import { UserContext } from "../Components/UserContext";

export default function Discussion() {
    const { loggedIn, isMember } = useContext(UserContext);
    const confirm = useConfirm();
    const router = useRouter();

    const clickHandler = (uniqueDestination: string) => {
        return () => {
            if (!loggedIn) {
                return confirm({
                    title: "Please log in",
                    description: "Please log in to access link.",
                    confirmationText: "Log in",
                }).then(() => {
                    router.push("/login?redirect_url=/community");
                });
            } else if (!isMember) {
                return confirm({
                    title: "Members only",
                    description: "Please get a membership to access link.",
                    confirmationText: "Membership",
                }).then(() => {
                    router.push("/membership");
                });
            } else {
                return router.push(uniqueDestination);
            }
        };
    };

    const whatsAppHandler = clickHandler("https://chat.whatsapp.com/Bqtf9Q2hhQw96RCHpuMPLm");
    const discordHandler = clickHandler("https://discord.com/invite/nhqyng5wQ9");
    const urbitHandler = clickHandler("https://tlon.network/lure/~hodpel-witdyr/serving-the-people");

    return (
        <DefaultLayout>
            <div className={css.wrapper}>
                <h1>Whatsapp</h1>
                <p>
                    Our Whatsapp group is where we vote on topics and discuss details pertaining to the weekly community meetings.
                </p>
                <Button
                    className={css.button}
                    variant="contained"
                    onClick={whatsAppHandler}>
                    Join the group
                </Button>
                <h1>Discord</h1>
                <p>
                    The Serving the People Discord is where our community gathers to discuss and chat. It features a diverse selection of channels, including art, film, video, tech, and more.
                </p>
                <Button
                    className={css.button}
                    variant="contained"
                    onClick={discordHandler}>
                    Join the Conversation
                </Button>
                <h1>Urbit</h1>
                <p>
                    Urbit is a new OS and peer-to-peer network that is designed to be simple, built to last forever, and 100% owned by its users. Urbit's Landscape, a collection of native apps for communicating and collaborating on the network, presents the possibility of a new way forward.
                </p>
                <p>
                    Serving the People has partnered with the Tlon Corporation to offer free hosting (usually $20/month) to members of Serving the People. Join us and a cohort of communities making the move to Urbit's Landscape.
                </p>
                <Button
                    className={css.button}
                    variant="contained"
                    onClick={urbitHandler}>
                    Learn More
                </Button>
            </div>
        </DefaultLayout>
    )
}
