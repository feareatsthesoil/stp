"use client";

import Comments from "@/components/chan/comments";
import CommentForm from "@/components/chan/comments/CommentForm";
import PostAttachmentViewer from "@/components/chan/posts/PostAttachmentViewer";
import { LoadingState } from "@/components/chan/posts/PostsLoadingState";
import { PostResponse } from "@/types";
import linkify from "@/utils/linkify";
import { getBoard, getPost } from "@/utils/services";
import { Boards } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PostPageChild() {
  const { id, slug } = useParams();
  const stringSlug = Array.isArray(slug) ? slug[0] : slug || "defaultSlug";
  const [post, setPost] = useState<PostResponse>();
  const [board, setBoard] = useState<Boards>();
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [version, setVersion] = useState(1);

  useEffect(() => {
    if (slug) {
      getBoard(slug as string).then(setBoard);
    }
  }, [slug]);

  useEffect(() => {
    if (id) {
      getPost(slug as string, Number(id) as number).then(setPost);
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const threshold = 50;
      const reachedBottom =
        scrollTop + windowHeight + threshold >= scrollHeight;
      setIsAtBottom(reachedBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return <LoadingState isCatalogView={false} showComponents={false} />;
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  const postSlug = board?.slug || "gc";
  const postContent = linkify(post?.content ?? "");

  if (post.attachments?.length) {
    console.log(post.attachments.length);
  }

  const firstImageUrl = post?.attachments?.find(
    (attachment) => attachment.isImage
  )?.url;

  return (
    <div className="bg-[#F4F4FE]">
      <>
        <div
          className="sticky top-0 z-50 flex justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] py-1 text-sm font-bold"
          style={{ width: "calc(100vw - 2rem)" }}
        >
          <Link
            className="font-black hover:underline"
            href={`/chan/${postSlug}`}
          >
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className="w-15 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
            >
              Back
            </button>
          </Link>
          {post.isAuthor ? (
            <Link href={`/chan/${postSlug}/post/${post.id}/edit`}>
              <button
                type="submit"
                color="rgb(239, 240, 240)"
                className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
              >
                Edit
              </button>
            </Link>
          ) : null}
          <Link
            className="hover:underline"
            href="javascript:void(0);"
            onClick={isAtBottom ? scrollToTop : scrollToBottom}
          >
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
            >
              {isAtBottom ? "Top" : "Bottom"}
            </button>
          </Link>
        </div>
        <div
          className="flex flex-col items-center text-left "
          style={{ width: "calc(100vw - 2rem)" }}
        >
          <div className="mb-2 max-w-[800px]">
            <h1 className="mt-4 font-sans text-lg font-bold">
              {post.title}{" "}
              <Link href={`/chan/${postSlug}`} passHref>
                <button
                  className={`w-15 ml-1 h-7 self-center rounded-md bg-[#DBDDFF] px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80`}
                >
                  {postSlug}
                </button>
              </Link>
            </h1>
            <div
              className="scrollbar-hide white-space-nowrap word-wrap break-word overflow-wrap break-word mt-1 overflow-x-auto overflow-y-hidden text-left font-sans "
              style={{
                maxWidth: "calc(100vw - 2rem)",
              }}
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
            {post.attachments?.length ? (
              <div className={`items-left mt-4 flex flex-col `}>
                <PostAttachmentViewer
                  isCatalogView={false}
                  attachments={post.attachments}
                  postView={true}
                />
              </div>
            ) : (
              ""
            )}
            <div className="relative mt-3 flex flex-row py-0.5 pt-2 text-xs leading-5 text-gray-500">
              <div className="absolute -bottom-2 left-0 top-0 flex w-6 justify-center">
                <div className="w-px bg-slate-200" />
              </div>
              <img
                src={post.user?.profileImageUrl || "/favicon.ico"}
                alt="User profile img"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src =
                    "https://ucarecdn.com/8c962272-5ea0-425a-851a-8b834177ea26/";
                }}
                className="relative mt-[5px] h-6 w-6 flex-none rounded-full bg-gray-50"
              />
              <div className="mb-[-0.1rem] ml-4 flex overflow-auto rounded-md bg-[#dbddffa5] p-2">
                <span className="min-w-max self-center font-sans font-medium text-gray-900">
                  {post.user?.firstName || post.user?.lastName
                    ? `${post.user?.firstName} ${post.user?.lastName}`
                    : "Anonymous"}
                </span>
                <p className="min-w-max self-center font-sans text-gray-500">
                  {" "}
                  &nbsp;posted @&nbsp;
                </p>
                <time
                  dateTime={
                    post.createdAt ? new Date(post.createdAt).toISOString() : ""
                  }
                  className="min-w-max self-center text-gray-500"
                >
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : ""}
                </time>
              </div>
            </div>
            <div className="mt-2 text-left">
              <Comments
                thread={true}
                reverseOrder
                key={version}
                id={Number(id)}
                slug={stringSlug}
                postId={post.id}
              />
            </div>
            <CommentForm
              onComplete={() => setVersion((v) => v + 1)}
              id={Number(id)}
            />
          </div>
        </div>
      </>
    </div>
  );
}
