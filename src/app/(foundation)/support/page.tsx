import { Container } from "@/components/Container";
import LinkIcon from "@/images/icons/linkIcon";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Support",
};

const Membership = () => {
  return (
    <Container className="my-6 max-w-[800px]">
      <div>
        <h1>Welcome!</h1>
        <p>
          {`Serving the People is a 501(c)(3) non-profit organization that assists
          artists and creators in making meaningful connections both online and
          in person. Established in 2017, STP has launched a number of
          initiatives and developed a platform for connecting creators with
          audiences, as well as finding opportunities for collaboration and
          support.`}
        </p>
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
        <Link
          href="https://donate.stripe.com/test_dR6cNJdBy2vY7kY6oo"
          target="_blank"
          className="group flex items-center underline"
        >
          Donate
          <LinkIcon
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            fill="black"
          />
        </Link>
      </div>
    </Container>
  );
};

export default Membership;
