import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const BoardSearch = React.memo(function ({
  setQuery,
  catalogText,
  toggleCatalogView,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
  catalogText: string;
  toggleCatalogView: () => void;
}) {
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

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
      <div className="w-full">
        <div className="sticky top-0 z-50 flex justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] py-2 text-sm font-bold">
          <div>
            <input
              type="text"
              name="Search"
              id="Search"
              className=",md:leading-6 block h-6 w-full rounded-sm border-0 pl-2 font-sans text-gray-900 placeholder:text-gray-400 focus:ring-0 md:text-sm"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul className="font-lg flex self-center [&>li]:pl-2">
            <li>
              <button
                type="submit"
                color="rgb(239, 240, 240)"
                className="w-15 ml-1 h-6 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
                onClick={toggleCatalogView}
              >
                {catalogText}
              </button>
            </li>
            <li>
              <button
                type="submit"
                color="rgb(239, 240, 240)"
                className="w-15 h-6 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
                onClick={isAtBottom ? scrollToTop : scrollToBottom}
              >
                {isAtBottom ? "Top" : "Bottom"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
});
export default BoardSearch;
