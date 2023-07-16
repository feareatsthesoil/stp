import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React from "react";
import DefaultLayout from "../Components/Layouts/DefaultLayout";

const Welcome = () => {
  const router = useRouter();
  const url = router.query.redirect_url as string;

  return (
    <DefaultLayout>
      <div className="flex h-[70vh] flex-col place-content-center font-sans">
        <SignIn afterSignInUrl={url ?? "/"} afterSignUpUrl={url ?? "/"} />
      </div>
    </DefaultLayout>
  );
};

export default Welcome;
