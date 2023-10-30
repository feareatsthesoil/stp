import { Container } from "@/Components/Container";
import personnel from "@/data/personnel.json";
import structureTree from "@/images/structureTree.svg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Philosophy",
};

const Philosophy: React.FC = () => {
  return (
    <Container className="mb-8">
      <div>
        <h1>Philosophy</h1>
        <p>
          <>
            {`Since the inception of STP, our unwavering philosophy has been to
            cultivate and perpetuate cultural enrichment. This isn't a mere
            statement but the very foundation on which our entire organization
            stands – from our diverse programs, unique brands, and multifaceted
            partnerships, to the nuances of our corporate structure.`}
          </>
        </p>
        <p>
          <>
            {`At the heart of STP's DNA is our commitment to ensuring that
              community well-being is always prioritized over profits. Our
              unique structural alignment, where our non-profit arm complements
              our for-profit initiatives, reinforces this commitment.`}
          </>
        </p>
      </div>
      <div>
        <h1>Overview</h1>
        <p>
          <>
            {`In the ever-evolving landscape of culture and society, we
              identified a gaping void – the need for a sustainable model of
              cultural enrichment. Recognizing the vast potential that a
              harmonious blend of community engagement and creative enterprise
              could offer, STP was born.`}
          </>
        </p>
        <p>
          <>
            {`Our approach is somewhat unconventional: leveraging the
              capabilities of a for-profit entity to propel innovative projects
              while ensuring that our nonprofit, The STP Creative Foundation,
              remains the bedrock of our operations, consistently channeling
              resources towards community engagement and growth.`}
          </>
        </p>
      </div>
      <div>
        <h1>The Structure</h1>
        <div className="flex flex-col items-center">
          <Image
            src={structureTree}
            height={1000}
            quality={100}
            alt="STP Structure Tree"
            className="mb-4"
          />
        </div>
      </div>
      <div>
        <h1>The STP Creative Foundation</h1>
        <p>
          <>
            {`Established as an integral arm of STP, The STP Creative Foundation
              has a singular purpose: to host enriching discussion groups in
              various cities, thereby fostering an environment of shared
              knowledge and growth. Beyond these discussions, the Foundation
              extends its outreach through programming, including workshops,
              lectures, and more, thereby ensuring a holistic approach to
              community development.`}
          </>
        </p>
        <p>
          <>
            {`Our commitment to prioritizing community over profits is made
              tangible through this foundation. Funds generated from our
              for-profit ventures are channeled into the foundation, ensuring
              that every venture indirectly contributes to our overarching goal
              of cultural enrichment.`}
          </>
        </p>
        <p>
          <>
            {`STP's for-profit projects, ranging from clothing lines to
              cutting-edge software like Studio, aren't just revenue generators.
              They are the lifeblood that fuels our mission, enabling us to
              invest more into the community. Through the innovative `}
            <Link href="#" className="underline">
              SEEDS
            </Link>
            {` project, we embrace the future of decentralized decision-making,
              allowing community participation in shaping our creative
              endeavors.`}
          </>
        </p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-y-10 sm:grid-cols-3">
        {personnel.items.map((group, index) => (
          <ul
            key={group.name}
            className={index === personnel.items.length - 1 ? "" : "flex-grow"}
          >
            <li className="mb-2 text-base/8">{group.name}</li>
            <ul>
              {group.children.map((member) => (
                <li
                  key={member.name}
                  className="text-base/6 font-bold tracking-[0.1px]"
                >
                  {member.name}
                </li>
              ))}
            </ul>
          </ul>
        ))}
      </div>
    </Container>
  );
};

export default Philosophy;
