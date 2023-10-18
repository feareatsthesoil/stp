import { Container } from "@/components/portal/Container";
import ArrowUpRight from "@/images/icons/arrowUpRight";
import Link from "next/link";
import React from "react";

const Proposals: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Proposals</h1>
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
          <Link href="#" className="flex flex-row underline">
            Visit Seeds DAO <ArrowUpRight />
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Proposals;
