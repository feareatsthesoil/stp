import { useUser } from "@clerk/nextjs";
import { Button, Chip } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useContext } from "react";
import DefaultLayout from "../Components/Layouts/DefaultLayout";
import JoinButton from "../Components/Membership/JoinButton";
import VerifySeedButton from "../Components/Membership/VerifySeedButton";
import { UserContext } from "../Components/UserContext";
import css from "../styles/Membership.module.css";

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
              {!purchase?.id && <JoinButton />}
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
            Receive early access to merchandise and apparel, as well as discount
            codes for select items in our shop - this includes tote bags, hats,
            and more.
          </li>
          <li>
            Access to all of Serving the People's{" "}
            <Link href="/community">community</Link> channels including
            Whatsapp, Discord, and Urbit.
          </li>
          <li>
            Unlock the ability to post to our community calendar, and creator
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
              sx={{
                backgroundColor: "rgb(239, 239, 239) !important",
                textTransform: "none",
                fontFamily: "Helvetica",
                fontSize: ".8em",
                borderRadius: "4px",
                color: "#000",
                border: "1px solid #000",
                height: "31.8px",
                padding: "0 8px",
                "&:hover ": {
                  backgroundColor: "rgb(220, 220, 220) !important;",
                },
              }}
              color="secondary"
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
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
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
              sx={{
                backgroundColor: "rgb(239, 239, 239) !important",
                textTransform: "none",
                fontFamily: "Helvetica",
                fontSize: ".8em",
                borderRadius: "4px",
                color: "#000",
                border: "1px solid #000",
                height: "31.8px",
                padding: "0 8px",
                "&:hover ": {
                  backgroundColor: "rgb(220, 220, 220) !important;",
                },
              }}
              color="secondary"
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
