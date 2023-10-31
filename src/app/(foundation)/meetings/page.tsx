import { Container } from "@/components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Meetings",
};

export default function IndexPage() {
  return (
    <Container className="w-full max-w-[800px]">
      <div>
        <h1>Meetings</h1>
        <p>
          {`We host weekly in-person discussions led by artists, providing a space
              for creative collaboration and dialogue. These meetings offer members
              the opportunity to connect and engage in meaningful dialogue about
              their work, ideas, and projects. They are designed to foster a
              supportive and inclusive environment where members can share their
              experiences and learn from one another.`}
        </p>
        <iframe
          src="https://lu.ma/embed/calendar/cal-0Gt4yRZeQakRw8M/events?lt=light"
          className="h-[65vh] w-full max-w-[800px] rounded-md border border-slate-200"
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={parseInt("0")}
        />
      </div>
    </Container>
  );
}
