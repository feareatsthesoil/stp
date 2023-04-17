import React, { useContext } from "react"
import Link from "next/link"
import index from "../styles/Membership.module.css"
import { UserContext } from "../Components/UserContext"
import { Button, Chip } from "@mui/material"
import JoinButton from "../Components/Membership/JoinButton"
import DefaultLayout from "../Components/Layouts/DefaultLayout"
import { useUser } from "@clerk/nextjs"
import moment from "moment"

const Membership = () => {
  const { initialized, purchase, isEdu } = useContext(UserContext)
  const { isLoaded, isSignedIn } = useUser()

  return (
    <DefaultLayout>
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
        <div className={index.border}/>
      </div>
      <div className={index.box}>
        <div className={index.title}>
          <h1>
            Individual Member: $75
          </h1>
          {!isEdu && initialized && <>{!purchase?.id && <div className={index.joinButton}><JoinButton /></div>}
            {purchase?.id && <>
              <div>
                <Chip 
                color="success" 
                label="Joined" 
                sx={{
                  float: "right",
                  
                }}
                />
                <><p>
                  Expires: {moment(purchase.expiryDate).format("DD MMMM, YYYY")}</p></>
              </div>
            </>}</>}
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
        <div className={index.border}/>
      </div>
      <div className={index.box}>
        <div className={index.title}>
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
        <div className={index.border}/>
      </div>
      <div className={index.box}>
        <div className={index.title}>
          <h1>
            Student membership: Free
          </h1>
          {isLoaded && !isSignedIn && <button>
            Log in
          </button>}
          {isEdu && <Chip color="success" label="Student" />}
        </div>
        <p>
          Students with a <strong>.edu</strong> email may enjoy all the benefits of the Individual Membership
          listed above. Simply <Link href="/login">Log in</Link> with <strong>.edu</strong> email to continue.
        </p>
        <div className={index.border}/>
      </div>
      <div className={index.box}>
        <div className={index.title}>
          <h1>
            Make a tax-deductible donation today.
          </h1>
          <div >
            <Button className={index.donateButton} target="_blank" variant="contained" href="https://donate.stripe.com/test_dR6cNJdBy2vY7kY6oo">
              Donate
            </Button>
          </div>
        </div>
        <p>
          With your support, Serving the People can continue to offer a wide range of resources
          and opportunies to artists. There include access to a community of fellow artists and supporters,
          as well as workshops, mentorship, events, and strengthen the arts community as a whole.
        </p>
      </div>
    </DefaultLayout>
  )
}

export default Membership