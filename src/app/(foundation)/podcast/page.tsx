import { Container } from "@/components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Podcast",
};

const Podcast: React.FC = () => {
  return (
    <Container>
      <div className="h-full">
        <h1></h1>
        <iframe
          id="embedPlayer"
          src="https://embed.podcasts.apple.com/us/podcast/discussions/id1677642006?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=light"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          allow="autoplay *; encrypted-media *; clipboard-write"
          className="h-[450px] max-w-[800px] rounded-md border-slate-200"
          style={{
            width: "calc(100vw - 2rem)",
            overflow: "hidden",
            borderRadius: "10px",
            transform: "translateZ(0px)",
            animation: "2s 6 loading-indicator",
            backgroundColor: "rgb(228, 228, 228)",
            border: "1px solid #e2e8f0",
          }}
        ></iframe>
      </div>
    </Container>
  );
};

export default Podcast;
