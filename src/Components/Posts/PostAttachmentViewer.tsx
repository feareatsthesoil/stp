import { useState } from "react";

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
  const screenWidth = window.innerWidth;

  const toggleExpanded = (index: number) => {
    if (expandedImages.includes(index)) {
      setExpandedImages(expandedImages.filter((i) => i !== index));
    } else {
      setExpandedImages([...expandedImages, index]);
    }
  };
  const [hover, setHover] = useState<number | null>(null);
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
          className={`flex  flex-wrap gap-2 ${
            isCatalogView ? "mx-2 flex-col" : "flex-row"
          }`}
        >
          {visibleAttachments.map((attachment: any, index: number) => (
            <div className="flex flex-col">
              <div
                className="relative flex w-max flex-col"
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                <img
                  style={{
                    maxWidth: expandedImages.includes(index)
                      ? postView
                        ? "calc(100vw - 2.5rem)"
                        : isCatalogView
                        ? "300px"
                        : "calc(100vw - 2rem)"
                      : postView
                      ? screenWidth < 570
                        ? "70vw"
                        : "300px"
                      : "300px",
                  }}
                  className={`max-h-[60vh] mdMobileX:max-h-[70vh] ${
                    isCatalogView
                      ? "max-h-[800px] max-w-[400px] pb-2 mdMobileX:max-w-[80vw]"
                      : ""
                  } 
                  ${expandedImages.includes(index) ? (postView ? "w" : "") : ""}
                  ${attachments?.length === 1 && "mb-1"}
                  `}
                  src={attachment.url}
                />
                {hover === index && !isCatalogView && (
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
          className={`w-15 ml-1
          h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs ${
            isCatalogView ? "mb-2 " : "mb-1 mt-2"
          }`}
          onClick={() => setShowAll(true)}
        >
          Show {attachments.length - 1} more images
        </button>
      )}
      {attachments?.length > 1 && showAll && (
        <button
          className={`w-15
        mb-1 mt-1 h-7 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs ${
          !postView && " float-left"
        } ${isCatalogView ? "mb-2 ml-2" : "mt-2"}`}
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </>
  );
}
