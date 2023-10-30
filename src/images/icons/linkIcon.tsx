import React from "react";

interface LinkIconProps {
  className?: string;
  fill?: string;
}

const LinkIcon: React.FC<LinkIconProps> = ({ className, fill }) => (
  <svg
    viewBox="0 0 7 7"
    fill="none"
    className={`ml-1 mt-[0.24rem] h-3 w-3 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 1C6.5 0.723857 6.27614 0.5 6 0.5L1.5 0.5C1.22386 0.5 1 0.723857 1 1C1 1.27614 1.22386 1.5 1.5 1.5L5.5 1.5L5.5 5.5C5.5 5.77614 5.72386 6 6 6C6.27614 6 6.5 5.77614 6.5 5.5L6.5 1ZM1.35355 6.35355L6.35355 1.35355L5.64645 0.646446L0.646447 5.64645L1.35355 6.35355Z"
      fill={fill || "#fff"}
    />
  </svg>
);

export default LinkIcon;
