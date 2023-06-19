import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useConfirm } from "material-ui-confirm";

import { UserContext } from "../../Components/UserContext";
import Calendar from "../../Components/Calendar";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";
import Boards from "../../Components/Boards";
import BoardView from "../../Components/Boards/[slug]";

export default function BoardsShow() {
  const { loggedIn, isMember } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();

  const {
    query: { slug },
  } = router;
  return (
    <div className="bg-[#F4F4FE]">
      <DefaultLayout boxClassName="!w-full">
        <div className="w-[96vw] border-[0] mt-[-18px] p-6 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm sm:flex-row">
          <p className="sm:pb-0 sm:pr-4 text-lg">/{slug}/</p>
          <div className="min-w-max"></div>
        </div>
        <div className="py-5">
          <BoardView slug={slug as string} />
        </div>
      </DefaultLayout>
    </div>
  );
}
