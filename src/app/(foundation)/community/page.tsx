"use client";

import { UserContext } from "@/components/userContext";
import { useUser } from "@clerk/nextjs";
import Button from "@mui/material/Button";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function Community() {
  const { isMember } = useContext(UserContext);
  const { isSignedIn } = useUser();
  const confirm = useConfirm();
  const router = useRouter();

  const clickHandler = (uniqueDestination: string) => {
    return () => {
      if (!isSignedIn) {
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
        return window.open(uniqueDestination);
      }
    };
  };

  const whatsAppHandler = clickHandler(
    "https://chat.whatsapp.com/C4DZ6DrsyxUJf6B3VOKKQ4"
  );
  const discordHandler = clickHandler("https://discord.com/invite/nhqyng5wQ9");
  const urbitHandler = clickHandler(
    "https://tlon.network/lure/~hodpel-witdyr/serving-the-people"
  );

  return (
    <>
      <div className="mt-4 w-[80vw] max-w-[1005px] [&>h1]:text-[1.3em] [&>h1]:font-bold [&>p]:py-2">
        <h1>Whatsapp</h1>
        <p>
          Our Whatsapp group is where we vote on topics and discuss details
          pertaining to the weekly community meetings.
        </p>
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
            margin: "0 0 2rem 0",
            "&:hover ": {
              backgroundColor: "rgb(220, 220, 220) !important;",
            },
          }}
          color="secondary"
          onClick={whatsAppHandler}
        >
          Join the group
        </Button>
        <h1>Discord</h1>
        <p>
          The Serving the People Discord is where our community gathers to
          discuss and chat. It features a diverse selection of channels,
          including art, film, video, tech, and more.
        </p>
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
            margin: "0 0 2rem 0",
            "&:hover ": {
              backgroundColor: "rgb(220, 220, 220) !important;",
            },
          }}
          color="secondary"
          onClick={discordHandler}
        >
          Join the Conversation
        </Button>
        <h1>Urbit</h1>
        <p>
          Urbit is a new OS and peer-to-peer network that is designed to be
          simple, built to last forever, and 100% owned by its users. Urbit's
          Landscape, a collection of native apps for communicating and
          collaborating on the network, presents the possibility of a new way
          forward.
        </p>
        <p>
          Serving the People has partnered with the Tlon Corporation to offer
          free hosting (usually $20/month) to members of Serving the People.
          Join us and a cohort of communities making the move to Urbit's
          Landscape.
        </p>
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
            margin: "0 0 1rem 0",
            "&:hover ": {
              backgroundColor: "rgb(220, 220, 220) !important;",
            },
          }}
          color="secondary"
          onClick={urbitHandler}
        >
          Learn More
        </Button>
      </div>
    </>
  );
}
