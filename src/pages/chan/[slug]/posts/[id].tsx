import { Boards } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Comments from "../../../../Components/Comments";
import CommentForm from "../../../../Components/Comments/CommentForm";
import DefaultLayout from "../../../../Components/Layouts/DefaultLayout";
import LikeButton from "../../../../Components/LikeButton";
import { getBoard, getPost } from "../../../../utils/services";
// import { Boards } from "@prisma/client";
import { PostResponse } from "../../../../types";
import { useAuth } from "@clerk/nextjs";

export default function PostViewPage() {
  const router = useRouter();
  const { id, slug } = router.query;
  const [post, setPost] = useState<PostResponse>();

  const [version, setVersion] = useState(1);
  const [board, setBoard] = useState<Boards>();
  let stringSlug = Array.isArray(slug) ? slug[0] : slug;
  stringSlug = stringSlug || "defaultSlug";
  useEffect(() => {
    if (id)
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
      });
  }, [id]);
  useEffect(() => {
    if (slug) getBoard(slug as string).then((data) => setBoard(data));
  }, [slug]);
  if (!post) return <DefaultLayout>Loading...</DefaultLayout>;

  const userName =
    post.user?.firstName || post.user?.lastName
      ? `${post.user?.firstName} ${post.user?.lastName}`
      : "Anonymous";

  return (
    <DefaultLayout>
      <div className="flex flex-row py-0.5 text-xs leading-5 text-gray-500">
        <img
          src={post.user?.profileImageUrl}
          alt=""
          className="relative mr-2 h-6 w-6 flex-none rounded-full bg-gray-50"
        />
        <span className="self-center font-medium text-gray-900">
          {userName}
        </span>
        <p className="self-center"> &nbsp;posted @&nbsp;</p>
        <time
          dateTime={
            post.createdAt ? new Date(post.createdAt).toISOString() : ""
          }
          className="self-center text-gray-500"
        >
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              })
            : ""}
        </time>
      </div>
      <div className="mb-2">
        <h1 className="text-lg font-semibold">{post.title}</h1>
        {post.attachment && (
          <img className="max-h-[500px] py-2" src={post.attachment} />
        )}
        <p>{post.content}</p>
      </div>
      <Comments
        key={version}
        id={Number(id)}
        slug={stringSlug}
        postId={post.id}
      />
      <CommentForm
        onComplete={() => setVersion((v) => v + 1)}
        id={Number(id)}
      />
    </DefaultLayout>
  );
}
