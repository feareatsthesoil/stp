"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import { useContext, useState } from "react";
import { UserContext } from "../../userContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function JoinButton() {
  const { loggedIn } = useContext(UserContext);
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();
  const router = useRouter();

  const handleClick = () => {
    if (!isSignedIn) {
      return confirm({
        title: "Please log in",
        description: "Please log in before purchasing a membership.",
        confirmationText: "Log in",
      }).then(() => {
        router.push("/login");
      });
    }
    setLoading(true);
    axios
      .post("/api/checkout/create")
      .then((response) => {
        window.location.replace(response.data.redirect);
      })
      .catch(() => {
        confirm({
          title: "Unsuccessful",
          description:
            "Unable to purchase a membership due to a server error. Please contact us with details of this issue.",
          confirmationText: "Contact",
        }).then(() => {
          router.push("/contact");
        });
      })
      .then(() => {
        setLoading(false);
      });
  };
  return (
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
      onClick={handleClick}
    >
      {!loading && <>Join Now!</>}
      {loading && <FontAwesomeIcon icon={faSpinner} spin />}
    </Button>
  );
}
