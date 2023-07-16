import React from "react";
import BoardView from "../../Components/Boards/BoardView";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import BoardPills from "../../Components/Boards/BoardPills";
import ChanLayout from "../../Components/Layouts/ChanLayout";

export default function BoardsIndexPage() {
  return (
    <div className="bg-[#F4F4FE]">
      <ChanLayout>
        <div className="ml-[2vw]">
          <BoardView slug="all" slugToPost="gc" />
        </div>
      </ChanLayout>
    </div>
  );
}
