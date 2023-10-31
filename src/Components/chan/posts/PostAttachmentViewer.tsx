import { useEffect, useState } from "react";

export default function PostAttachmentViewer({
  attachments,
  isCatalogView,
  postView = false,
}: {
  attachments: any[];
  isCatalogView: boolean;
  postView?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const [expandedImages, setExpandedImages] = useState<number[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 570);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 570;
      setIsMobile(mobileView);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [attachments]);

  const toggleExpanded = (index: number) => {
    if (expandedImages.includes(index)) {
      setExpandedImages(expandedImages.filter((i) => i !== index));
    } else {
      setExpandedImages([...expandedImages, index]);
    }
  };

  const visibleAttachments = attachments
    ? showAll
      ? attachments
      : attachments.slice(0, 1)
    : [];

  return (
    <>
      {visibleAttachments && (
        <div
          className={`flex flex-wrap gap-2 ${
            isCatalogView ? "mx-2 flex-col" : "flex-row"
          }`}
        >
          {visibleAttachments.map((attachment: any, index: number) => (
            <div className="flex flex-col">
              <div
                className="relative flex flex-col"
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                <div
                  style={{
                    overflow: "hidden",
                    maxWidth: expandedImages.includes(index)
                      ? "100%"
                      : isMobile && !isCatalogView
                      ? "100%"
                      : "300px",
                    width: expandedImages.includes(index) ? "100%" : "",
                  }}
                >
                  {attachment.isImage ? (
                    <img
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        display: "block",
                      }}
                      className={`${
                        isCatalogView ? "max-h-[800px] max-w-[400px] pb-2" : ""
                      } ${isMobile ? "max-h-[80vh]" : "max-h-[60vh]"}
                        `}
                      src={`${attachment.url}`}
                    />
                  ) : attachment.mimeType?.startsWith("video") ? (
                    <video
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        display: "block",
                      }}
                      className={`${
                        isCatalogView ? "max-h-[800px] max-w-[400px] pb-2" : ""
                      } ${isMobile ? "max-h-[80vh]" : "max-h-[60vh]"}
                        `}
                      controls
                      autoPlay
                      loop
                      muted
                      webkit-playsinline
                      playsInline
                      src={attachment.url}
                    />
                  ) : attachment.mimeType?.startsWith("audio") ? (
                    <audio
                      className="w-min-max"
                      controls
                      src={`${attachment.url}`}
                    />
                  ) : null}
                </div>
                {hover === index &&
                  !isCatalogView &&
                  !isMobile &&
                  !attachment.mimeType?.startsWith("audio") && (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="absolute right-1 top-1 rounded-md bg-[#eff0f0] p-1"
                    >
                      {expandedImages.includes(index) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#4a4d50"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.strokeWidth = "1.5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.strokeWidth = "1")
                          }
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#4a4d50"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.strokeWidth = "1.5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.strokeWidth = "1")
                          }
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                          />
                        </svg>
                      )}
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
      {attachments?.length > 1 && !showAll && (
        <button
          className={`w-15 ml-1 h-7 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs ${
            isCatalogView ? "mb-2 " : "mt-2"
          } ${postView ? "self-start " : "self-center"}`}
          onClick={() => setShowAll(true)}
        >
          Show {attachments.length - 1} more images
        </button>
      )}
      {attachments?.length > 1 && showAll && (
        <button
          className={`w-15 mt-1 h-7 self-start rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs ${
            !postView && "float-left"
          } ${isCatalogView ? "mb-2 ml-2" : "mt-2"}`}
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </>
  );
}
