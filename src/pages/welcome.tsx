import React from "react"
import Link from "next/link"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Welcome.module.css"

const Welcome = () => {
  return (
    <>
      <div className={index.body}>
        <Header />
        <div className={index.box}>
          <h1>
            Welcome!
          </h1>
          <p>
            Serving the People is a 501(c)(3) non-profit organization that
            assists artists and creators in making meaningful connections both
            online and in person. Established in 2017, STP has launched a number
            of initiatives and developed a platform for connecting creators with
            audiences, as well as finding opportunities for collaboration and support.
          </p>
          <p>
            Your contribution directly supports Serving the People&apos;s public programs.
            By joining our community, you can enjoy priority access to events and support
            artists globally.
          </p>
          <p>
            All memberships are valid for one year.
          </p>
          <div className={index.border}></div>
        </div>
        <div className={index.box}>
          <div className={index.header}>
            <h1>
              Individual Member: $75
            </h1>
            <button>
              Join Now
            </button>
          </div>
          <p>Benefits</p>
          <ul>
            <li>
              Receive a 20% discount on any items in our shop&#8211; this includes tote bags
            </li>
            <li>
              Exclusive invites to events and happenings.
            </li>
            <li>
              Contributor access to our community calendar.
              This allows you to post your own events and happenings to our calendar
              which is shared on our weekly newsletter.
            </li>
          </ul>
          <div className={index.border}></div>
        </div>
        <div className={index.box}>
          <div className={index.header}>
            <h1>
              Seed Members
            </h1>
            <button>
              Connect Wallet
            </button>
          </div>
          <p>
            <Link href="/mintseed">Seeds</Link> is a digital artwork created with the purpose
            of supporting our community. A seed may be purchased <Link href="/mintseed">here</Link> or on <Link href="www.opensea.com">Opensea</Link>.
          </p>
          <ul>
            <li>
              All the benefits of Individual Membership listed above, plus access to special channels
              on <Link href="/">Urbit</Link> and <Link href="/">Discord</Link>.
            </li>
          </ul>
          <div className={index.border}></div>
        </div>
        <div className={index.box}>
          <div className={index.header}>
            <h1>
              Student membership: Free
            </h1>
            <button>
              Log in
            </button>
          </div>
          <p>
            Students with a <strong>.edu</strong> email may enjoy all the benefits of the Individual Membership
            listed above. Simply <Link href="/login">Log in</Link> with <strong>.edu</strong> email to continue.
          </p>
          <div className={index.border}></div>
        </div>
        <div className={index.box}>
          <div className={index.header}>
            <h1>
              Make a tax-deductible donation today.
            </h1>
            <button>
              Donate
            </button>
          </div>
          <p>
            With your support, Serving the People can continue to offer a wide range of resources
            and opportunies to artists. There include access to a community of fellow artists and supporters,
            as well as workshops, mentorship, events, and strengthen the arts community as a whole.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Welcome