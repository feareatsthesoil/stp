import { TextField } from "@mui/material";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts } from "../../utils/services";
import Comments from "../Comments";

export default function Posts(props: { slug: string }) {
  const [posts, setPosts] = useState<Post[]>();

  const [query, setQuery] = useState<string>();
  const { slug } = props;
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
      <TextField
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="text"
        placeholder="Search"
        className="py-4"
        sx={{
          margin: "20px auto 20px 0",
          "& fieldset": {
            border: "1px solid black !important",
            borderRadius: "4px",
          },
          "& input": {
            fontFamily: "Helvetica",
            fontSize: ".8em",
            padding: "11px",
            height: "10px",
          },
          "&::placeholder ": {
            color: "#000!important",
          },
        }}
      />
      {posts?.map((post) => {
        return (
          <div className="flex flex-row border-t border-solid border-slate-300 pt-2">
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
                  className="text-md mb-5 w-full space-y-6 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
              </div>
            </div>
            <div className="basis-2/4">
              <Comments id={post.id} />
            </div>
          </div>
        );
      })}
    </>
  );
}
