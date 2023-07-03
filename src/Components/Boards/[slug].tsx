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
      <div className="mt-[-18px] flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-slate-300 p-6 text-sm font-bold sm:flex-row">
        <PostForm slug={slug as string} />
      </div>
      <div className="flex w-[96vw] place-content-center border-[0] border-b border-solid border-slate-300 p-1 text-sm font-bold">
        <ul className="font-lg flex [&>li]:pr-2">
          <li>
            <Link href="#">[Search]</Link>
          </li>
          <li>
            <Link href="#">[Catalog]</Link>
          </li>
          <li>
            <Link href="#">[Bottom]</Link>
          </li>
        </ul>
      </div>
      <Posts slug={slug as string} />
    </>
  );
}
