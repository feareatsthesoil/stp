import { Boards } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getBoard } from "../../utils/services";
import Posts from "../Posts";
import PostForm from "../Posts/PostForm";

export default function BoardView({ slug }: { slug: string }) {
  const [board, setBoard] = useState<Boards>();
  const [query, setQuery] = useState<string>("");
  const [isCatalogView, setIsCatalogView] = useState<boolean>(false);
  const [catalogText, setCatalogText] = useState<string>("Catalog");
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  useEffect(() => {
    getBoard(slug).then((data) => {
      setBoard(data);
    });
  }, []);

  const toggleCatalogView = () => {
    setIsCatalogView(!isCatalogView);
    setCatalogText(isCatalogView ? "Catalog" : "List");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const reachedBottom = scrollTop + windowHeight >= scrollHeight;
    setIsAtBottom(reachedBottom);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-slate-300 py-2 text-sm font-bold sm:flex-row">
        <PostForm slug={slug as string} />
      </div>
      <div className="sticky top-0 z-50 flex w-[96vw] justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] py-1 text-sm font-bold">
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
            <Link
              className="hover:underline"
              href="javascript:void(0);"
              onClick={toggleCatalogView}
            >
              [{catalogText}]
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline"
              href="javascript:void(0);"
              onClick={isAtBottom ? scrollToTop : scrollToBottom}
            >
              {isAtBottom ? "[Top]" : "[Bottom]"}
            </Link>
          </li>
        </ul>
      </div>
      <Posts
        slug={slug as string}
        query={query}
        isCatalogView={isCatalogView}
      />
    </>
  );
}
