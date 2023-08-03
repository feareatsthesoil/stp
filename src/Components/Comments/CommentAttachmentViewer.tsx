import React, { useState } from "react";

interface CommentAttachmentViewerProps {
  attachments: any[];
}

const CommentAttachmentViewer: React.FC<CommentAttachmentViewerProps> = ({
  attachments,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [expandedImages, setExpandedImages] = useState<number[]>([]);
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
      : [attachments[0]]
    : [];

  return (
    <>
      {visibleAttachments.map((attachment, index) => {
        return attachment ? (
          <div
            key={index}
            className="relative flex-col"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <img
              className={`max-h-[50vh] max-w-[300px]`}
              src={attachment.url}
            />
            <div>
              <ul
                className={`scrollbar-hide flex w-fit max-w-[95vw] flex-row overflow-x-auto pb-2 pt-2`}
              >
                <li
                  className={`h-4 w-max self-center border-[0] border-r-[1px] border-solid border-black pr-1 text-xs mdMobileX:hidden`}
                >
                  {attachment.width}&nbsp;x&nbsp;{attachment?.height}&nbsp;
                </li>
                <li
                  className={`h-4 min-w-max self-center border-[0] border-r-[1px] border-solid border-black px-1 text-xs mdMobileX:hidden`}
                >
                  {formatBytes(parseInt(attachment.size))}
                </li>
                <li className="h-4 w-max self-center px-1 text-xs mdMobileX:px-0">
                  <a
                    href={attachment?.url}
                    className="text-blue-600 underline hover:text-indigo-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attachment.filename}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : null;
      })}
      {attachments?.length > 1 && !showAll && (
        <button
          className={`w-15 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs`}
          onClick={() => setShowAll(true)}
        >
          Show {attachments.length - 1} more images
        </button>
      )}
      {attachments?.length > 1 && showAll && (
        <button
          className={`w-15 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs`}
          onClick={() => setShowAll(false)}
        >
          Show Less
        </button>
      )}
    </>
  );
};

export default CommentAttachmentViewer;
