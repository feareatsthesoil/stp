import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Index from "../styles/Mail.module.css"

const Mail = () => {
  return (
    <>
      <div className={Index.Body}>
        <Header />
        <div className={Index.Box}>
          <h1>Index</h1>
          <p>
            Serving the People is a 501(c)(3) non-profit organization that assists artists
            and creators in making meaningful connections both online and in person.
            Established in 2017, STP has launched a number of initiatives and developed a
            platform for connecting creators with audiences, as well as finding opportunities
            for collaboration and support.
          </p>
          <p>
            The STP community offers a variety of programming and events, including a weekly
            in person meeting led by artists in the community. Members can also enjoy weekly
            essays and other writing on STP&apos;s blog and newsletter, which also feature updates
            from the STP community.
          </p>
          <p>
            <strong>Subscribe to our weekly newsletter for happenings and events</strong>
          </p>
          <div className={Index.Input}>
            <div className={Index.Text}><textarea name="email" placeholder="info@stp.world"/></div>
            <div className={Index.buttonBody}><button className={Index.Button}>Subscribe</button></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Mail
