"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const Welcome = () => {
  const { get } = useSearchParams();
  const url = get("redirect_url");

  return (
    <div className="flex h-[70vh] flex-col place-content-center font-sans">
      <SignIn afterSignInUrl={url ?? "/"} afterSignUpUrl={url ?? "/"} />
    </div>
  );
};

export default Welcome;
