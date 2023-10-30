import { Container } from "@/Components/Container";
import LinkIcon from "@/images/icons/linkIcon";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Proposals",
};

const Proposals: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Proposal Gateway</h1>
        <p>
          {`The Proposal Gateway is our primary mechanism for proposals and grants, we leverage web3 technology to ensure every stakeholder has the chance to
            shape the trajectory of our initiatives. Here, every idea, big or
            small, has the potential to impact our future directions. This
            platform embodies our commitment to transparent and collective
            innovation.`}
        </p>
        <p>
          {`We invite you to engage, propose, debate, vote, and
            actively contribute to this narrative where, together,
            we write our next chapters.`}
        </p>
        <div>
          <Link
            href="#"
            target="_blank"
            className="group flex items-center underline"
          >
            Visit the Proposal Gateway
            <LinkIcon
              className="self-start opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              fill="white"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Proposals;
