import { Post } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "../../utils/services";
import Comments from "../Comments";

export default function Posts({
  slug,
  query,
}: {
  slug: string;
  query: string;
}) {
  const [posts, setPosts] = useState<Post[]>();
  const [commentsLimit, setCommentsLimit] = useState<number>(3);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setCommentsLimit(2);
      } else {
        setCommentsLimit(3);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!posts) return <>Loading...</>;

  return (
    <>
      {posts?.map((post, index) => {
        return (
          <div
            className={`flex flex-row py-2 ${
              index !== 0 ? "border-t border-solid border-slate-300" : ""
            }`}
          >
            <div className="basis-2/4">
              <time
                dateTime={
                  post.createdAt ? new Date(post.createdAt).toISOString() : ""
                }
                className="mt-[10px] border-l border-gray-200 text-gray-500"
              >
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString([], {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : ""}
              </time>
              <div className="items-left mr-5 flex flex-col">
                <p className="w-1/3 text-sm text-gray-700">
                  {post.attachment && (
                    <img className="py-2" src={post.attachment} />
                  )}
                </p>
                <h3 className="text-lg font-medium text-gray-900">
                  <Link
                    className="pb-2"
                    href={`/chan/${slug}/posts/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </h3>
                <div
                  className="text-md w-full space-y-6 pb-2 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
              </div>
            </div>
            <div className="basis-2/4">
              <Comments id={post.id} limit={commentsLimit} />
            </div>
          </div>
        );
      })}
    </>
  );
}
