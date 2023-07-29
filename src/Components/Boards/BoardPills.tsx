import { Tooltip } from "@mui/material";
import { Boards } from "@prisma/client";
import Link from "next/link";
import React from "react";

const BoardPills = React.memo(function ({
  slug,
  currentPath,
  boards,
}: {
  slug?: string;
  currentPath: string;
  boards: Boards[];
}) {
  return (
    <div className="scrollbar-hide z-20 mt-2 flex w-full flex-row gap-1 overflow-x-auto overflow-y-hidden">
      <Link href="/chan">
        <button
          className={`relative h-7 w-[100px] rounded-md px-2 py-[4px] font-sans text-sm font-normal hover:opacity-80 sm:h-5 sm:w-[90px] sm:py-[2px] sm:text-xs ${
            currentPath === "/chan"
              ? "bg-[#272fc756] text-[#1d205e]"
              : "bg-[#DBDDFF] text-[#1d205e]"
          }`}
        >
          All Channels
        </button>
      </Link>
      {boards?.map((board) => {
        let isActive = slug === board.slug;
        return (
          <Tooltip
            key={board.slug}
            color="#cecee0"
            title={<h1 className="text-[1.2em]">/{board.slug}</h1>}
            arrow
          >
            <Link href={`/chan/${board.slug}`} passHref>
              <button
                className={`w-15 relative h-7 w-max rounded-md px-2 font-sans text-sm font-normal hover:opacity-80 sm:h-5 sm:text-xs ${
                  isActive
                    ? "bg-[#272fc756] text-[#1d205e]"
                    : "bg-[#DBDDFF] text-[#1d205e]"
                }`}
              >
                {board.name}
              </button>
            </Link>
          </Tooltip>
        );
      })}
    </div>
  );
});

export default BoardPills;
