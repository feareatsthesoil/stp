import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "../../utils/services";
import Comments from "../Comments";
import { PostResponse } from "../../types";
import { useAuth } from "@clerk/nextjs";
import LikeButton from "../LikeButton";

export default function Posts({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) {
  const { userId } = useAuth();
  const [posts, setPosts] = useState<PostResponse[]>();
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    getPosts(slug).then((resp) => {
      if (query) {
        const filteredPosts = resp.filter(
          (post) =>
            post.title.includes(query) ||
            (post.content && post.content.includes(query))
        );
        setPosts(filteredPosts);
      } else {
        setPosts(resp);
      }
    });
  }, [slug, query]);

  if (!posts) return <>Loading...</>;

  return (
    <>
      {posts?.map((post, index) => (
        <div key={post.id}>
          <div
            className={`flex flex-col py-2 md:flex-row ${
              index !== 0 ? "border-t border-solid border-slate-300" : ""
            }`}
          >
            <div className="pr-2 md:w-2/4">
              <div className="flex flex-row py-0.5 text-xs leading-5 text-gray-500">
                <img
                  src={post.user?.profileImageUrl}
                  alt=""
                  className="relative mr-2 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <span className="self-center font-medium text-gray-900">
                  {post.user?.firstName || post.user?.lastName
                    ? `${post.user?.firstName} ${post.user?.lastName}`
                    : "Anonymous"}
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
                <Link
                  href={`/chan/${slug}/posts/${post.id}`}
                  className="ml-3 mr-1 self-center text-sm font-semibold text-black hover:underline"
                >
                  [More]
                </Link>
                {/* <LikeButton likeableId={post.id} likeableType={"post"} /> */}
              </div>
              <div className="items-left mr-5 flex flex-col">
                <p className="w-1/3 text-sm text-gray-700">
                  {post.attachment && (
                    <img className="py-2" src={post.attachment} />
                  )}
                </p>
                <h3 className="text-lg font-medium leading-5 text-gray-900 hover:underline">
                  <Link
                    className="pb-2"
                    href={`/chan/${slug}/posts/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </h3>
                <div
                  className="text-md w-full space-y-6 py-2 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
              </div>
            </div>
            <div className="md:w-2/4">
              <Comments id={post.id} slug={slug} postId={post.id} limit={3} />
            </div>
          </div>
          {userId === post.userId ? (
            <div className="flex flex-row border-t border-solid border-slate-300">
              <Link
                className="text-sm font-bold hover:underline"
                href={`/chan/${slug}/posts/${post.id}/edit`}
              >
                [Edit]
              </Link>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
}
