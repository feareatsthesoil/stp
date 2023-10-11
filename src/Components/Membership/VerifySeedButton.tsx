"use client";

import { useUser } from "@clerk/nextjs";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { Button } from "@mui/material";
import axios from "axios";
import { clsx } from "clsx";
import { utils } from "ethers";
import { useConfirm } from "material-ui-confirm";
import { useCallback, useContext, useState } from "react";
import { useAccount, useConnect, useSigner } from "wagmi";
import { UserContext } from "../UserContext";
import { useRouter } from "next/navigation";

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
  const { refresh } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();
  const { isSignedIn } = useUser();
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
      {!isSignedIn && (
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
          onClick={onLoggedOutClick}
        >
          {!loading && <>Verify Seed</>}
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </Button>
      )}
      {isSignedIn && address && (
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
            onClick={onVerifySeedClick}
          >
            Verify Seed
          </Button>
        </div>
      )}
      {isSignedIn && !address && (
        <Menu as="div" className="relative">
          <Menu.Button
            style={{
              textTransform: "none",
              fontFamily: "Helvetica",
              fontSize: ".8em",
              borderRadius: "4px",
              border: "1px solid #000",
              height: "31.8px",
              padding: "0 8px",
              transition: "0.2s",
            }}
            color="secondary"
            className="h-[30px] bg-[#efefef] hover:bg-[#d6d6d6]"
          >
            Connect Wallet
          </Menu.Button>
          <Menu.Items className="absolute bottom-[calc(100%+10px)] right-0 flex w-[150px] flex-col gap-2 rounded-[4px] bg-[#fff] p-[10px] ring-1 ring-black sm:bottom-[unset] sm:top-[calc(100%+10px)]">
            {connectors.map((connector) => (
              <button
                key={connector.name}
                style={{
                  transition: "0.2s",
                }}
                className={clsx(
                  "h-[30px] w-full rounded-sm bg-[#efefef] font-sans text-sm ring-1 ring-black hover:bg-[#d6d6d6]",
                  {
                    "hidden sm:block":
                      connector?.name?.toLowerCase() === "metamask",
                  }
                )}
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
