import { Tooltip } from "@mui/material";
import { Boards } from "@prisma/client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { getBoards } from "../../utils/services";
import Posts from "../Posts";
import PostForm from "../Posts/PostForm";
import { UserContext } from "../UserContext";
import { colors } from "./colors";

export default function BoardView({ slug }: { slug?: string }) {
  const [boards, setBoards] = useState<Boards[]>();
  const [query, setQuery] = useState<string>("");
  const [isCatalogView, setIsCatalogView] = useState<boolean>(false);
  const [catalogText, setCatalogText] = useState<string>("Catalog");
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
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

  let firstButtonActive = true;

  if (boards) {
    firstButtonActive = !boards.some((board) => slug === board.slug);
  }

  return (
    <>
      <div className="mt-[-10px] flex w-[96vw] flex-row place-content-center border-[0] border-b border-solid border-slate-300 pb-2 text-sm font-bold">
        {loggedIn ? (
          <PostForm slug={slug as string} />
        ) : (
          <Link className="text-md hover:underline" href="/login">
            [Log In / Sign Up to Post]
          </Link>
        )}
      </div>
      <div className="sticky top-0 z-50 flex w-[96vw] justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] py-1 text-sm font-bold">
        <div>
          <input
            type="text"
            name="Search"
            id="Search"
            className={`block w-full rounded-sm border-0 pl-2 font-sans text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
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
      <div className="px-xs py-sm scrollbar-hide top-xl sm:p-sm min-1 z-10 mt-2 flex w-full flex-row gap-1 overflow-x-auto overflow-y-hidden">
        <Link href="/chan">
          <button
            className={`relative h-7 w-[35px] rounded-md bg-[#dbddffa5] px-2 py-[4px] font-sans text-sm font-normal hover:opacity-80 sm:h-5 sm:w-8 sm:py-[2px] sm:text-xs ${
              firstButtonActive ? "bg-[#272fc756]" : ""
            }`}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="1.5"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M2 12H22"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </Link>
        {boards?.map((board, index) => {
          let color = colors[index % colors.length];
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
      <Posts
        slug={slug as string}
        query={query}
        isCatalogView={isCatalogView}
      />
    </>
  );
}
