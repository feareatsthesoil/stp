import { Tooltip } from "@mui/material";
import { Boards } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBoards } from "../../utils/services";

export default function BoardPills({ slug }: { slug?: string }) {
  const [boards, setBoards] = useState<Boards[]>();
  useEffect(() => {
    getBoards().then((data) => {
      const sortedBoards = data.sort((a, b) => a.id - b.id);
      setBoards(sortedBoards);
    });
  }, []);
  return (
    <div className="px-xs py-sm scrollbar-hide top-xl sm:p-sm min-1 z-20  flex w-[96%] translate-y-[3rem] flex-row gap-1 overflow-x-auto overflow-y-hidden sm:translate-y-[3rem] ">
      <Link href="/chan">
        <button
          className={`relative h-7 w-[35px] rounded-md px-2 py-[4px] font-sans text-sm font-normal hover:opacity-80 sm:h-5 sm:w-8 sm:py-[2px] sm:text-xs ${
            slug === "all" ? "bg-[#272fc756]" : "bg-[#dbddffa5]"
          }`}
        >
          All
        </button>
      </Link>
      {boards?.map((board, index) => {
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
                  isActive ? "bg-[#272fc756]" : "bg-[#DBDDFF]"
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
}
