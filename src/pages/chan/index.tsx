import React from "react";
import Boards from "../../Components/Boards";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function BoardsIndexPage() {
  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout boxClassName="!w-full">
        <div className="w-[96vw] border-[0] mt-[-18px] p-6 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm sm:flex-row">
          <p className="pb-1 sm:pb-0 sm:pr-4">Welcome to the Chan. Be nice!</p>
          <div className="min-w-max"></div>
        </div>
        <div className="py-5">
          <Boards />
        </div>
      </DefaultLayout>
    </div>
  );
}
