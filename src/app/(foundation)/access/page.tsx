"use client";

import { UserContext } from "@/components/userContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";

const Membership = () => {
  const { initialized, purchase, isEdu, refresh } = useContext(UserContext);
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { get } = useSearchParams();
  const code = get("code");
  const { enqueueSnackbar } = useSnackbar();
  console.log(code);
  useEffect(() => {
    if (code && isLoaded && user) {
      setLoading(true);
      axios
        .get("/api/membership/grant?code=" + code)
        .then(() => {
          console.log("Success");
          refresh();
          enqueueSnackbar("You are now a member!");
          router.push("/membership");
        })
        .catch((err) => {
          setError(err?.response?.data?.message ?? "Something went wrong.");
        });
    }
  }, [code, user, isLoaded]);

  if (!initialized || !isLoaded) return;
  <>Loading...</>;

  return (
    <>
      <div className="my-4">
        <h1 className="text-xl font-bold capitalize">
          Claim a one year membership
        </h1>
        {(purchase || isEdu) && <p>You are already a member</p>}
        {!isSignedIn && (
          <p>
            Please&nbsp;
            <Link
              style={{ textDecoration: "underline" }}
              href={`/login?redirect_url=${encodeURI(pathname)}`}
            >
              log in
            </Link>{" "}
            to claim.
          </p>
        )}
        {isSignedIn && !purchase && loading && (
          <p>Please wait. If it takes too long, refresh the page.</p>
        )}
        {error}
        {(!code || code === "") && <p>Invalid URL</p>}
      </div>
    </>
  );
};

export default Membership;
