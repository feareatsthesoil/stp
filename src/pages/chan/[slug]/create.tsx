import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useConfirm } from "material-ui-confirm";


import { UserContext } from "../../../Components/UserContext";

import DefaultLayout from "../../../Components/Layouts/DefaultLayout";
import PostForm from "../../../Components/Posts/PostForm";

export default function BoardsShow() {
  const { loggedIn, isMember } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();

  const {query: {slug}} = router
  return (
    <DefaultLayout boxClassName="!w-full">
      <div className="w-[96vw] border-[0] mt-[-18px] ml-[-2vw] p-5 border-b border-solid border-black place-content-center flex flex-col font-bold text-sm sm:flex-row">
        <p className="pb-1 sm:pb-0 sm:pr-4">
          Create a post
        </p >
        <div className="min-w-max">

        </div>
      </div >
      <div className="py-5">
        <PostForm slug={slug as string} />
      </div>
    </DefaultLayout >
  );
}