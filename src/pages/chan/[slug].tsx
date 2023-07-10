import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BoardView from "../../Components/Boards/[slug]";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function BoardsShow() {
  const router = useRouter();

  useEffect(() => {}, []);
  const {
    query: { slug, name },
  } = router;

  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout boxClassName="!w-full">
        <div className="mb-[18px] mt-[-18px] flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-slate-300 p-6 text-sm font-bold sm:flex-row">
          <p className="text-lg sm:pb-0 sm:pr-4">/{slug}/</p>
        </div>
        <BoardView slug={slug as string} />
      </DefaultLayout>
    </div>
  );
}
