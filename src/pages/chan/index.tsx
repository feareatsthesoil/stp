import React from "react";
import BoardView from "../../Components/Boards/[slug]";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function BoardsIndexPage() {
  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout boxClassName="!w-full">
        <BoardView slug="all" />
      </DefaultLayout>
    </div>
  );
}
