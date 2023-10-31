"use client";

import { Boards } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import PostForm from "@/components/chan/posts/PostForm";
import PostDeleteButton from "@/components/chan/posts/PostDeleteButton";
import { getBoard, getPost } from "@/utils/services";
import { PostResponse } from "@/types";
import { useParams, useRouter } from "next/navigation";

export default function PostEditPage() {
  const router = useRouter();
  const { id, slug } = useParams();
  const [post, setPost] = useState<PostResponse | null>(null);
  const [board, setBoard] = useState<Boards | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    if (id && slug) {
      setIsLoading(true);
      const promises = [
        getPost(slug as string, Number(id) as number),
        getBoard(slug as string),
      ];
      Promise.all(promises)
        .then((data) => {
          setPost(data[0] as PostResponse);
          setBoard(data[1] as Boards);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [id, slug]);
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowCookieBanner(true);
  };

  const handleYes = () => {
    router.back();
  };

  const handleNo = () => {
    setShowCookieBanner(false);
  };

  if (isLoading) {
    return <p className="my-2">Loading...</p>;
  }

  if (!post) {
    return <p>Error: Post data not loaded.</p>;
  }
  console.log("post", slug);
  return (
    <div className="bg-[#F4F4FE]">
      {post.isAuthor ? (
        <>
          <p className="my-2">
            <Link
              className="font-black hover:underline"
              href="#"
              onClick={handleBackClick}
            >
              <button
                type="submit"
                color="rgb(239, 240, 240)"
                className="w-15 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
              >
                Back
              </button>
            </Link>
          </p>
          {showCookieBanner && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-min-full rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
                <p className="text-center font-sans text-lg font-bold leading-6 text-gray-900">
                  Are you sure you want to leave?
                </p>
                <p className="text-center font-sans text-sm font-bold leading-6 text-gray-500">
                  Remember to save changes.
                </p>
                <div className="flex place-content-center gap-x-2">
                  <button
                    type="button"
                    className="w-15 mt-2 h-8 rounded-md bg-red-200 px-2 font-sans text-sm font-normal text-red-500 hover:bg-red-300 hover:text-red-600"
                    onClick={handleYes}
                  >
                    Leave
                  </button>
                  <button
                    type="button"
                    className="w-15 float-right mt-2 h-8 rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6]"
                    onClick={handleNo}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <PostForm post={post} slug={slug as string} edit={true} />
            <div className="mb-2 w-full max-w-[500px] self-center">
              {/* @ts-ignore */}
              <PostDeleteButton
                postId={post.id}
                onComplete={() => router.push("/chan")}
                slug={slug as string}
              >
                Delete Post
              </PostDeleteButton>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-4 border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#f3ce49"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-sans text-sm text-yellow-700">
                You do not have permission to edit this post.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
