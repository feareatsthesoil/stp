import { useUser } from "@clerk/nextjs";
import { Button, Chip } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useContext } from "react";
import DefaultLayout from "../Components/Layouts/DefaultLayout";
import JoinButton from "../Components/Membership/JoinButton";
import VerifySeedButton from "../Components/Membership/VerifySeedButton";
import { UserContext } from "../Components/UserContext";

const Membership = () => {
  const { initialized, purchase, isEdu, isSeedHolder } =
    useContext(UserContext);
  const { isLoaded, isSignedIn } = useUser();

  return (
    <DefaultLayout>
      <div className="center my-4 flex flex-col [&>div]:flex [&>div]:max-w-[1000px] [&>div]:flex-col">
        <div className="w-full">
          <div>
            <h1 className="text-xl font-bold">Welcome!</h1>
            <p className="pt-2">
              Serving the People is a 501(c)(3) non-profit organization that
              assists artists and creators in making meaningful connections both
              online and in person. Established in 2017, STP has launched a
              number of initiatives and developed a platform for connecting
              creators with audiences, as well as finding opportunities for
              collaboration and support.
            </p>
            <p className="pt-2">
              Your contribution directly supports Serving the People&apos;s
              public programs. By joining our community, you can enjoy priority
              access to events and support artists globally.
            </p>
            <div className="mt-4 border-b-[1px] border-solid" />
          </div>
          <div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="font-bold">Individual Member: $75/year</h1>
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
                      <div className="flex ">
                        <>
                          <p className="self-center pr-2">
                            Expires:{" "}
                            {moment(purchase.expiryDate).format(
                              "DD MMMM, YYYY"
                            )}
                          </p>
                        </>
                        <Chip
                          color="success"
                          label="Joined"
                          sx={{
                            float: "right",
                            borderRadius: "4px",
                            fontFamily: "Helvetica",
                          }}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <p className="pt-2">Benefits</p>
            <ul className="list-disc pl-6 leading-5">
              <li>
                Receive early access to merchandise and apparel, as well as
                discount codes for select items in our shop - this includes tote
                bags, hats, and more.
              </li>
              <li>
                Access to all of Serving the People's{" "}
                <Link href="/community">community</Link> channels including
                Whatsapp, Discord, and Urbit.
              </li>
              <li>
                Unlock the ability to post to our community calendar, and
                creator directory.
              </li>
            </ul>
            <div className="mt-4 border-b-[1px] border-solid" />
          </div>
          <div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="font-bold">Seed Members</h1>
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
            <p className="pt-2">
              <Link href="/mintseed">Seeds</Link> is a digital artwork created
              with the purpose of supporting our community. A seed may be
              purchased <Link href="/mintseed">here</Link> or on{" "}
              <Link href="https://opensea.io/collection/seeds-luciensmith">
                Opensea
              </Link>
              .
            </p>
            <ul>
              <li>
                All the benefits of Individual Membership listed above, plus
                access to special channels on <Link href="#">Urbit</Link> and{" "}
                <Link href="https://discord.com/invite/nhqyng5wQ9">
                  Discord
                </Link>
                .
              </li>
            </ul>
            <div className="mt-4 border-b-[1px] border-solid" />
          </div>
          <div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="font-bold">Student membership: Free</h1>
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
            <p className="pt-2">
              Students with a <strong>.edu</strong> email may enjoy all the
              benefits of the Individual Membership listed above. Simply{" "}
              <Link href="/login?redirect_url=/membership">Log in</Link> with{" "}
              <strong>.edu</strong> email to continue.
            </p>
            <div className="mt-4 border-b-[1px] border-solid" />
          </div>
          <div>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="font-bold">
                Make a tax-deductible donation today.
              </h1>
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
                    marginLeft: "1rem",
                  }}
                  color="secondary"
                  href="https://donate.stripe.com/test_dR6cNJdBy2vY7kY6oo"
                >
                  Donate
                </Button>
              </div>
            </div>
            <p className="pt-2">
              With your support, Serving the People can continue to offer a wide
              range of resources and opportunies to artists. There include
              access to a community of fellow artists and supporters, as well as
              workshops, mentorship, events, and strengthen the arts community
              as a whole.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Membership;
