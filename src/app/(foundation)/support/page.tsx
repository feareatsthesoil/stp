import { Container } from "@/components/Container";
import LinkIcon from "@/images/icons/linkIcon";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import DonateButton from "./DonateButton";

export const metadata: Metadata = {
  title: "Support",
};

const Membership = () => {
  return (
    <Container className="my-6 max-w-[800px] text-slate-800">
      <div>
        <h1>We need your support!</h1>
        <p>
          {`Your contribution directly supports Serving the People's public
          programs. By joining our community, you can enjoy priority access to
          events and support artists globally.`}
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mb-8 text-lg">Make a tax-deductible donation today</h2>
        </div>
        <p>
          {`With your support, Serving the People can continue to offer a wide
          range of resources and opportunies to artists. There include access to
          a community of fellow artists and supporters, as well as workshops,
          mentorship, events, and strengthen the arts community as a whole.`}
        </p>
      </div>
      <div>
        <DonateButton />
      </div>
    </Container>
  );
};

export default Membership;
