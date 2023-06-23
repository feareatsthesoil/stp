import { TextField } from "@mui/material";
import { Boards } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBoard } from "../../utils/services";
import Posts from "../Posts";
import PostForm from "../Posts/PostForm";

export default function BoardView({ slug }: { slug: string }) {
  const [board, setBoard] = useState<Boards>();
  useEffect(() => {
    getBoard(slug).then((data) => {
      setBoard(data);
    });
  }, []);

  return (
    <>
      <div className="w-[96vw] border-[0] mt-[-18px] p-6 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm sm:flex-row">
        <PostForm slug={slug as string} />
      </div>
      <div className="w-[96vw] border-[0] p-6 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm sm:flex-row">
        <ul className="flex font-lg [&>li]:pr-2">
          <li>
            <Link href="#"> Search</Link>
          </li>
          <li>
            <Link href="#"> Catalog</Link>
          </li>
          <li>
            <Link href="#"> Bottom</Link>
          </li>
        </ul>
      </div>
      <Posts slug={slug as string} />
    </>
  );
}
