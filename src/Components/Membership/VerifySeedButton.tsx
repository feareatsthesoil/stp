import { useUser } from "@clerk/nextjs";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { Button } from "@mui/material";
import axios from "axios";
import { clsx } from "clsx";
import { utils } from "ethers";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { useAccount, useConnect, useSigner } from "wagmi";
import { UserContext } from "../UserContext";

function shortAddress(address: string): string {
  if (utils.isAddress(address)) {
    if (!address.startsWith("0x")) {
      address = "0x" + address;
    }
    return address.slice(0, 6) + "…" + address.slice(address.length - 4);
  }
  return "";
}

const message = "Requesting ownership verification...";
const contractAddress = "0xbcdf4823fc65e6aa243963f955fd5ce885066306";

export default function VerifySeedButton() {
  const { user } = useUser();
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: signer } = useSigner();
  const { loggedIn, refresh } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();
  const router = useRouter();

  const onLoggedOutClick = useCallback(() => {
    return confirm({
      title: "Please log in",
      description: "Please log in before verifying seed.",
      confirmationText: "Log in",
    }).then(() => {
      router.push("/login");
    });
  }, []);
  const onVerifySeedClick = useCallback(async () => {
    if (signer) {
      try {
        const signature = await signer.signMessage(message);
        const response = await axios.post(
          "https://ae-backend.lobus.io/validate-nft-ownership",
          {
            message,
            signature,
            contractAddress,
          }
        );

        const {
          data: { owner },
        } = response;
        await user?.update({
          unsafeMetadata: { isSeedHolder: owner },
        });
        if (owner) {
          refresh();
        } else {
          alert("You don't have a seed.");
        }
      } catch {}
    }
  }, [signer, user, refresh]);
  return (
    <>
      {!loggedIn && (
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
          onClick={onLoggedOutClick}
        >
          {!loading && <>Verify Seed</>}
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </Button>
      )}
      {loggedIn && address && (
        <div className="flex items-center gap-2">
          <span className="text-xs">{shortAddress(address)}</span>
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
                transition:
                  "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              },
            }}
            color="secondary"
            variant="contained"
            onClick={onVerifySeedClick}
          >
            Verify Seed
          </Button>
        </div>
      )}
      {loggedIn && !address && (
        <Menu as="div" className="relative">
          <Menu.Button
            style={{
              backgroundColor: "rgb(239, 239, 239) !important",
              textTransform: "none",
              fontFamily: "Helvetica",
              fontSize: ".8em",
              borderRadius: "4px",
              color: "#000",
              border: "1px solid #000",
              height: "31.8px",
              padding: "0 8px",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            }}
            color="secondary"
            className="h-[30px]"
          >
            Connect Wallet
          </Menu.Button>
          <Menu.Items className="absolute bottom-[calc(100%+10px)] flex flex-col gap-2 sm:bottom-[unset] sm:top-[calc(100%+10px)] w-[150px] p-[10px] right-0 bg-white rounded-[4px] ring-1 ring-black">
            {connectors.map((connector) => (
              <button
                style={{
                  boxShadow:
                    "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                }}
                key={connector.name}
                className={clsx("w-full h-[30px]", {
                  "hidden sm:block":
                    connector?.name?.toLowerCase() === "metamask",
                })}
                onClick={() => connect({ connector })}
              >
                {connector.name}
              </button>
            ))}
          </Menu.Items>
        </Menu>
      )}
    </>
  );
}
