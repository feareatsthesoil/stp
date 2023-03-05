import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Discussion.module.css"

const Discussion = () => {
    return (
        <>
            <div className={index.body}>
                <Header />
                <div className={index.box}>
                    <h1>Discord</h1>
                    <p>
                        The Serving the People Discord is where our community gathers to discuss and chat. 
                        It features a diverse selection of channels, including art, film, video, tech, and more. 
                    </p>
                    <div className={index.buttonBody}>
                        <button className={index.button}>
                            Join the Conversation
                        </button>
                    </div>
                    <h1>Urbit</h1>
                    <p>
                        The STP community offers a variety of programming and events, including a weekly
                        in person meeting led by artists in the community. Members can also enjoy weekly
                        essays and other writing on STP&apos;s blog and newsletter, which also feature updates
                        from the STP community.
                    </p>
                    <p>
                        The STP community offers a variety of programming and events, including a weekly
                        in person meeting led by artists in the community. Members can also enjoy weekly
                        essays and other writing on STP&apos;s blog and newsletter, which also feature updates
                        from the STP community.
                    </p>
                    <div className={index.buttonBody}>
                        <button className={index.button}>
                            Learn More
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Discussion
