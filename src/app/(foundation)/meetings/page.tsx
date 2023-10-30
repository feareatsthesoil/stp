import { Container } from "@/Components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Meetings",
};

export default function IndexPage() {
  return (
    <Container className="w-full max-w-[800px]">
      <div>
        <h1></h1>
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
