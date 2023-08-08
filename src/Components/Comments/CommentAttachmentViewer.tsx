import React, { useEffect, useState } from "react";

interface CommentAttachmentViewerProps {
  attachments: any[];
}

const CommentAttachmentViewer: React.FC<CommentAttachmentViewerProps> = ({
  attachments,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [expandedImages, setExpandedImages] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 570);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 570) {
        setIsMobile(true);
        setExpandedImages([]);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleExpanded = (index: number) => {
    if (!isMobile && expandedImages.includes(index)) {
      setExpandedImages(expandedImages.filter((i) => i !== index));
    } else if (!isMobile) {
      setExpandedImages([...expandedImages, index]);
    }
  };

  const visibleAttachments = attachments
    ? showAll
      ? attachments
      : [attachments[0]]
    : [];

  return (
    <>
      <div className="flex max-w-[900px] flex-row flex-wrap gap-2 pt-1 mdMobileX:flex-col">
        {visibleAttachments.map((attachment, index) => {
          return attachment ? (
            <div className="flex flex-col">
              <div
                key={index}
                className="relative flex flex-col"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <img
                  style={{
                    width: expandedImages.includes(index) ? "100%" : "",
                    maxWidth: expandedImages.includes(index)
                      ? "900px"
                      : screenWidth < 570
                      ? "70vw"
                      : "300px",
                  }}
                  className="max-h-[60vh]"
                  src={attachment.url}
                />
                {!isMobile && hoveredIndex === index && (
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
          ) : null;
        })}
      </div>
      {attachments?.length > 1 && !showAll && (
        <button
          className={`w-15 mt-2 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs`}
          onClick={() => setShowAll(true)}
        >
          Show {attachments.length - 1} more images
        </button>
      )}
      {attachments?.length > 1 && showAll && (
        <button
          className={`w-15 mt-2 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs`}
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </>
  );
};

export default CommentAttachmentViewer;
