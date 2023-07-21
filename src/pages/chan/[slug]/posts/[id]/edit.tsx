import { Boards, Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultLayout from "../../../../../Components/Layouts/DefaultLayout";
import PostDeleteButton from "../../../../../Components/Posts/PostDeleteButton";
import PostForm from "../../../../../Components/Posts/PostForm";
import { getBoard, getPost } from "../../../../../utils/services";
import Link from "next/link";

export default function PostEditPage() {
  const router = useRouter();
  const { id, slug } = router.query;

  const [post, setPost] = useState<Post>();
  const [board, setBoard] = useState<Boards>();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    if (id) {
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (slug) {
      getBoard(slug as string).then((data) => setBoard(data));
    }
  }, [slug]);

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

  if (!post)
    return (
      <DefaultLayout>
        <p className="my-2">Loading...</p>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <p className="my-2">
        <Link
          className="font-black hover:underline"
          href="javascript:void(0);"
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
            <p className="text-center text-lg font-bold leading-6 text-gray-900">
              Are you sure you want to leave?
            </p>
            <p className="text-center text-sm font-bold leading-6 text-gray-500">
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
        <PostForm post={post} slug={slug as string} />
        <div className="mb-2 w-full sm:ml-0 sm:max-w-[500px] sm:self-center">
          <PostDeleteButton
            postId={post.id}
            onComplete={() => router.push("/chan")}
          >
            Delete Post
          </PostDeleteButton>
        </div>
      </div>
    </DefaultLayout>
  );
}
