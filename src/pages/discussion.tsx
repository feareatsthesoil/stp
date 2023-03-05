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
                        Serving the People is a 501(c)(3) non-profit organization that assists artists
                        and creators in making meaningful connections both online and in person.
                        Established in 2017, STP has launched a number of initiatives and developed a
                        platform for connecting creators with audiences, as well as finding opportunities
                        for collaboration and support.
                    </p>
                    <div className={index.buttonBody}>
                        <button className={index.button}>
                            Join the Conversation
                        </button>
                    </div>
                    <h1>Urbit</h1>
                    <p>
                        Urbit is a new OS and peer-to-peer network that is designed to be simple, 
                        built to last forever, and 100% owned by its users. Urbit&apos;s Landscape, a collection 
                        of native apps for communicating and collaborating on the network, presents the possibility 
                        of a new way forward.
                    </p>
                    Serving the People has partnered with the Tlon Corporation to offer free hosting 
                    (usually $20/month) to members of Serving the People. Join us and a cohort of 
                    communities making the move to Urbit's Landscape.
                    <p>
                       
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
