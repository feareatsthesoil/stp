import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BoardView from "../../Components/Boards/BoardView";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import BoardPills from "../../Components/Boards/BoardPills";
import ChanLayout from "../../Components/Layouts/ChanLayout";

export default function BoardsShow() {
  const router = useRouter();

  useEffect(() => {}, []);
  const {
    query: { slug, name },
  } = router;

  return (
    <div className="bg-[#F4F4FE]">
      <ChanLayout>
        <div className="ml-[2vw]">
          <BoardView slug={slug as string} />
        </div>
      </ChanLayout>
    </div>
  );
}
