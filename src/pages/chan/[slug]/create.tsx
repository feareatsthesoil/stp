import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import DefaultLayout from "../../../Components/Layouts/DefaultLayout";
import PostForm from "../../../Components/Posts/PostForm";
import { UserContext } from "../../../Components/UserContext";

export default function BoardsShow() {
  const { loggedIn, isMember } = useContext(UserContext);
  const confirm = useConfirm();
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  return (
    <DefaultLayout>
      <div className="ml-[-2vw] mt-[-18px] flex w-[96vw] flex-col place-content-center border-[0] border-b border-solid border-black p-5 text-sm font-bold sm:flex-row">
        <p className="pb-1 sm:pb-0 sm:pr-4">Create a post</p>
        <div className="min-w-max"></div>
      </div>
      <div className="py-5">
        <PostForm slug={slug as string} />
      </div>
    </DefaultLayout>
  );
}
