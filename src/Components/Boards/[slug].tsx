import { Boards } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBoard } from "../../utils/services";
import Posts from "../Posts";
import PostForm from "../Posts/PostForm";

export default function BoardView({ slug }: { slug: string }) {
  const [board, setBoard] = useState<Boards>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    getBoard(slug).then((data) => {
      setBoard(data);
    });
  }, []);

  return (
    <>
      <div className="flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-slate-300 py-2 text-sm font-bold sm:flex-row">
        <PostForm slug={slug as string} />
      </div>
      <div className="flex w-[96vw] justify-between border-[0] border-b border-solid border-slate-300 p-1 text-sm font-bold">
        <div>
          <input
            type="text"
            name="Search"
            id="Search"
            className={`block w-full rounded-sm border-0 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="font-lg flex self-center [&>li]:pl-2">
          <li>
            <Link href="#">[Catalog]</Link>
          </li>
          <li>
            <Link href="#">[Bottom]</Link>
          </li>
        </ul>
      </div>
      <Posts slug={slug as string} query={query} />
    </>
  );
}
