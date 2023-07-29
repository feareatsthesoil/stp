import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CommentResponse } from "../../types";
import { getComments } from "../../utils/services";
import { UserContext } from "../UserContext";
import CommentDeleteButton from "./CommentDeleteButton";
import linkify from "../../utils/linkify";

interface CommentsProps {
  id: number;
  limit?: number;
  slug: string;
  postId: number;
  reverseOrder?: boolean;
  thread?: boolean;
  showMoreComments?: boolean;
  homeComments?: boolean;
}

export default function Comments({
  id,
  limit = 5,
  slug,
  postId,
  reverseOrder = false,
  thread = false,
  showMoreComments = false,
  homeComments = false,
}: CommentsProps) {
  const { userId } = useAuth();
  const [comments, setComments] = useState<CommentResponse[]>();
  const [count, setCount] = useState(-1);
  const { loggedIn } = useContext(UserContext);
  const refresh = () => {
    getComments(id).then(({ data, headers }) => {
      setCount(Number(headers["total-records"]));
      setComments(data);
    });
  };
  useEffect(() => {
    getComments(id).then(({ data, headers }) => {
      setCount(Number(headers["total-records"]));
      setComments(data);
    });
  }, [id]);

  if (!comments || comments.length === 0) return null;

  let displayedComments = limit ? comments.slice(0, limit) : comments;

  if (reverseOrder) {
    displayedComments = displayedComments.reverse();
  }

  const lastCommentIndex = displayedComments.length - 1;

  return (
    <>
      <ul role="list" className="mb-2 ml-[10px] space-y-2">
        {displayedComments.map((comment, index) => (
          <li className="relative flex gap-x-4" key={comment.id}>
            <div
              className={`absolute left-0 top-0 flex w-6 justify-center ${
                thread
                  ? `-bottom-6`
                  : `${index === lastCommentIndex ? "h-6" : "-bottom-6"} `
              }`}
            >
              <div className="w-px bg-gray-200" />
            </div>
            <img
              src={comment.user?.profileImageUrl || "/favicon.ico"}
              alt=""
              className="relative mt-2 h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <div className="flex-col rounded-md bg-[#dbddffa5] p-2">
              <div className="flex justify-between">
                <div className="scrollbar-hide flex overflow-x-auto py-0.5 text-xs leading-5 text-gray-900">
                  <span className="mr-1 truncate font-sans font-medium">
                    {comment.user?.firstName || comment.user?.lastName
                      ? `${comment.user?.firstName} ${comment.user?.lastName}`
                      : "Anonymous"}
                  </span>{" "}
                  <p className="min-w-max font-sans text-gray-500">
                    commented @&nbsp;
                  </p>
                  <time
                    dateTime={
                      comment.createdAt
                        ? new Date(comment.createdAt).toISOString()
                        : ""
                    }
                    className="flex-none text-xs leading-5 text-gray-500"
                  >
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString([], {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      : ""}
                  </time>
                  {comment.isAuthor ? (
                    <div className="ml-1 min-w-max">
                      <CommentDeleteButton
                        className="self-center"
                        postId={comment.postId}
                        commentId={comment.id}
                        onComplete={refresh}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <p
                className="overflow-x-auto font-sans text-sm leading-6 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    homeComments && comment.content
                      ? linkify(
                          comment.content?.split(" ").slice(0, 250).join(" ") ||
                            ""
                        ) +
                        (comment.content?.split(" ").length > 250 ? "..." : "")
                      : linkify(comment.content || ""),
                }}
              ></p>
            </div>
          </li>
        ))}
      </ul>
      {showMoreComments && count > limit && (
        <Link
          className="hover:underline"
          href={`/chan/${slug}/posts/${postId}`}
        >
          <div className="mb-2 ml-14 font-sans text-xs">
            {count - limit} more comment
            {count - limit > 1 ? "s" : ""}
          </div>
        </Link>
      )}
    </>
  );
}
