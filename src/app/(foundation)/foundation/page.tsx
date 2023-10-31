import { Container } from "@/Components/Container";
import personnel from "@/data/personnel.json";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mission",
};

export default function Community() {
  return (
    <>
      <div className="my-6 max-w-[800px]">
        <Container className="">
          <div className="text-slate-800">
            <h1>Mission</h1>
            <p className="mt-6">
              {`Serving the People is a 501(c)(3) non-profit organization committed to
              assisting creatives in making meaningful connections both online and in
              person. Established in 2017, STP has launched a number of initiatives
              and developed a platform for connecting creators with audiences, as well
              as finding opportunities for collaboration and support.`}
            </p>
          </div>
          <div className="grid grid-cols-2 justify-between gap-y-10 text-slate-800 sm:grid-cols-3">
            {personnel.items.map((group, index) => (
              <ul
                key={group.name}
                className={
                  index === personnel.items.length - 1 ? "" : "flex-grow"
                }
              >
                <li className="mb-2 text-base/8 text-slate-500">
                  {group.name}
                </li>
                <ul>
                  {group.children.map((member) => (
                    <li
                      key={member.name}
                      className="text-base/6 font-bold tracking-[0.1px] text-slate-800"
                    >
                      {member.name}
                    </li>
                  ))}
                </ul>
              </ul>
            ))}
          </div>
        </Container>
      </div>
      <div className="mb-8 mt-auto max-w-[800px]">
        <p className="font-serif text-lg/8 tracking-[.035rem] text-slate-800">
          {`We understand that dialogue is what drives societal transformation and catalyzes profound progress.`}
        </p>
      </div>
    </>
  );
}
