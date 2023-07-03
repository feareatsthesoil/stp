import React from "react";
import BoardView from "../../Components/Boards/[slug]";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function BoardsIndexPage() {
  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout boxClassName="!w-full">
        <div className="mt-[-18px] flex w-[96vw] flex-row place-content-center border-[0] border-b border-solid border-black p-6 text-sm font-bold">
          <p className="">Welcome to the Chan. Be nice!</p>
          <div className="min-w-max"></div>
        </div>
        <BoardView slug="b" />
      </DefaultLayout>
    </div>
  );
}
