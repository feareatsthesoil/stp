import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Link from "next/link"

import index from "../styles/About.module.css"

const Welcome = () => {
  return (
    <>
      <div className={index.Body}>
        <Header />
        <div className={index.Box}>
          <h1>Welcome!</h1>
          <p>Serving the People is a 501(c)(3) non-profit organization that 
            assists artists and creators in making meaningful connections both 
            online and in person. Established in 2017, STP has launched a number 
            of initiatives and developed a platform for connecting creators with 
            audiences, as well as finding opportunities for collaboration and support.
          </p>
          <p>Your contribution directly supports Serving the People&apos;s public programs. 
            By joining our community, you can enjoy priority access to events and support 
            artists globally.
          </p>
          <p>All memberships are valid for one year.</p>
          <hr/>
          <button>Join Now</button>
          <h1>Individual Member: $75</h1>
          <p>Benefits</p>
          <ul>
            <li>
              Receive a 20% discount on any items in our shop- this includes tote bags
            </li>
          </ul>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>Blach</p>
          <hr/>
          <button>Sign in with Seed</button>
          <h1>Welcome!</h1>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>Blach</p>
          <hr/>
          <button>Sign in with Seed</button>
          <h1>Welcome!</h1>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>Blach</p>
          <hr/>
          <button>Sign in with Seed</button>
          <h1>Welcome!</h1>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <p>Blach</p>
          <hr/>
          <button>Sign in with Seed</button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Welcome