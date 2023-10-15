import React from "react";
export default function IndexPage() {
  return (
    <iframe
      src="https://lu.ma/embed/calendar/cal-0Gt4yRZeQakRw8M/events?lt=light"
      width="100%"
      height="100%"
      frameBorder="0"
      style={{
        width: `calc(100vw - 2rem)`,
        height: "calc(100vh - 7.1rem)",
        backgroundColor: "#fff!important",
      }}
      allowFullScreen={true}
      aria-hidden="false"
      tabIndex={parseInt("0")}
    ></iframe>
  );
}
