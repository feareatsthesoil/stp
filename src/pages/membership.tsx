import React, { useContext } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button, Chip } from "@mui/material";
import moment from "moment";

import css from "../styles/Membership.module.css";
import { UserContext } from "../Components/UserContext";
import DefaultLayout from "../Components/Layouts/DefaultLayout";
import JoinButton from "../Components/Membership/JoinButton";
import VerifySeedButton from "../Components/Membership/VerifySeedButton";

const Membership = () => {
  const { initialized, purchase, isEdu, isSeedHolder } =
    useContext(UserContext);
  const { isLoaded, isSignedIn } = useUser();

  return (
    <DefaultLayout>
      <div className={css.box}>
        <h1>Welcome!</h1>
        <p>
          Serving the People is a 501(c)(3) non-profit organization that assists
          artists and creators in making meaningful connections both online and
          in person. Established in 2017, STP has launched a number of
          initiatives and developed a platform for connecting creators with
          audiences, as well as finding opportunities for collaboration and
          support.
        </p>
        <p>
          Your contribution directly supports Serving the People&apos;s public
          programs. By joining our community, you can enjoy priority access to
          events and support artists globally.
        </p>
        <div className={css.border} />
      </div>
      <div className={css.box}>
        <div className={css.title}>
          <h1>Individual Member: $75/year</h1>
          {isEdu ? (
            <Chip
              sx={{
                borderRadius: "4px",
                fontFamily: "Helvetica",
              }}
              color="success"
              label="Joined"
            />
          ) : (
            ""
          )}
          {!isEdu && initialized && (
            <>
              {" "}
              {!purchase?.id && (
                <div className={css.joinButton}>
                  <JoinButton />
                </div>
              )}
              {purchase?.id && (
                <>
                  <div>
                    <Chip
                      color="success"
                      label="Joined"
                      sx={{
                        float: "right",
                        borderRadius: "4px",
                        fontFamily: "Helvetica",
                      }}
                    />
                    <>
                      <p>
                        Expires:{" "}
                        {moment(purchase.expiryDate).format("DD MMMM, YYYY")}
                      </p>
                    </>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <p>Benefits</p>
        <ul>
          <li>
            Receive a 20% discount on select items in our shop&#8211; this
            includes tote bags, hats, and more.
          </li>
          <li>Exclusive invites to events and happenings.</li>
          <li>
            Gain access as a contributor to our community calendar and creator
            directory.
          </li>
        </ul>
        <div className={css.border} />
      </div>
      <div className={css.box}>
        <div className={css.title}>
          <h1>Seed Members</h1>
          <div className={css.joinButton}>
            {isSeedHolder ? (
              <Chip
                sx={{
                  borderRadius: "4px",
                  fontFamily: "Helvetica",
                }}
                color="success"
                label="Joined"
              />
            ) : (
              <VerifySeedButton />
            )}
          </div>
        </div>
        <p>
          <Link href="/mintseed">Seeds</Link> is a digital artwork created with
          the purpose of supporting our community. A seed may be purchased{" "}
          <Link href="/mintseed">here</Link> or on{" "}
          <Link href="https://opensea.io/collection/seeds-luciensmith">
            Opensea
          </Link>
          .
        </p>
        <ul>
          <li>
            All the benefits of Individual Membership listed above, plus access
            to special channels on <Link href="#">Urbit</Link> and{" "}
            <Link href="https://discord.com/invite/nhqyng5wQ9">Discord</Link>.
          </li>
        </ul>
        <div className={css.border} />
      </div>
      <div className={css.box}>
        <div className={css.title}>
          <h1>Student membership: Free</h1>
          {isLoaded && !isSignedIn && (
            <Button
              className={css.button}
              variant="contained"
              href="/login?redirect_url=/membership"
            >
              Log in
            </Button>
          )}
          {isEdu ? (
            <Chip
              sx={{
                borderRadius: "4px",
                fontFamily: "Helvetica",
              }}
              color="success"
              label="Joined"
            />
          ) : (
            ""
          )}
          {isSignedIn && !isEdu ? (
            <Chip
              sx={{
                borderRadius: "4px",
                fontFamily: "Helvetica",
                border: "1px solid #000",
              }}
              label="Unauthenticated"
            />
          ) : (
            ""
          )}
        </div>
        <p>
          Students with a <strong>.edu</strong> email may enjoy all the benefits
          of the Individual Membership listed above. Simply{" "}
          <Link href="/login?redirect_url=/membership">Log in</Link> with{" "}
          <strong>.edu</strong> email to continue.
        </p>
        <div className={css.border} />
      </div>
      <div className={css.box}>
        <div className={css.title}>
          <h1>Make a tax-deductible donation today.</h1>
          <div>
            <Button
              className={css.button}
              target="_blank"
              variant="contained"
              href="https://donate.stripe.com/test_dR6cNJdBy2vY7kY6oo"
            >
              Donate
            </Button>
          </div>
        </div>
        <p>
          With your support, Serving the People can continue to offer a wide
          range of resources and opportunies to artists. There include access to
          a community of fellow artists and supporters, as well as workshops,
          mentorship, events, and strengthen the arts community as a whole.
        </p>
      </div>
    </DefaultLayout>
  );
};

export default Membership;
