import { Container } from "@/Components/Container";
import LinkIcon from "@/images/icons/linkIcon";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Contact</h1>
        <p>
          {`As our primary mechanism for proposals and grants, `}
          <Link href="#" className="underline">
            Seeds
          </Link>
          {` leverages web3 technologies to ensure every stakeholder has the chance to
          shape the trajectory of our initiatives. Here, every idea, big or
          small, has the potential to impact our future directions. This
          platform embodies our commitment to transparent and collective
          innovation.`}
        </p>
        <p>
          {`We invite you to engage, propose, debate, vote, and
          actively contribute to this decentralized narrative where, together,
          we script our next chapters.`}
        </p>
        <p>
          <Link
            href="#"
            target="_blank"
            className="group flex items-center underline"
          >
            Visit Seeds DAO
            <LinkIcon
              className="self-start opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              fill="white"
            />
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Contact;
