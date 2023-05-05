import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { clsx } from "clsx";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import axios from "axios";
import { utils } from "ethers";
import { useAccount, useConnect, useSigner } from "wagmi";
import { useUser } from "@clerk/nextjs";

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
        alert("You don't have a seed.");
        refresh();
      } catch {}
    }
  }, [signer, user]);
  return (
    <>
      {!loggedIn && (
        <Button onClick={onLoggedOutClick}>
          {!loading && <>Verify Seed</>}
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </Button>
      )}
      {loggedIn && address && (
        <div className="flex items-center gap-2">
          <span className="text-xs">{shortAddress(address)}</span>
          <Button onClick={onVerifySeedClick}>Verify Seed</Button>
        </div>
      )}
      {loggedIn && !address && (
        <Menu as="div" className="relative">
          <Menu.Button className="h-[30px]">Connect Wallet</Menu.Button>
          <Menu.Items className="absolute bottom-[calc(100%+10px)] flex flex-col gap-2 sm:bottom-[unset] sm:top-[calc(100%+10px)] w-[150px] p-[10px] right-0 bg-white rounded-[4px] ring-1 ring-black">
            {connectors.map((connector) => (
              <button
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
