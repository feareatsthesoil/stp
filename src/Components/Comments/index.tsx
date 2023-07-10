import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CommentResponse } from "../../types";
import { getComments } from "../../utils/services";
import { UserContext } from "../UserContext";
import CommentDeleteButton from "./CommentDeleteButton";

interface CommentsProps {
  id: number;
  limit?: number;
  slug: string;
  postId: number;
  reverseOrder?: boolean;
  thread?: boolean;
  showMoreComments?: boolean;
}

export default function Comments({
  id,
  limit = 5,
  slug,
  postId,
  reverseOrder = false,
  thread = false,
  showMoreComments = false,
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
    refresh();
  }, [id]);

  if (!comments || comments.length === 0) return null;

  let displayedComments = limit ? comments.slice(0, limit) : comments;

  if (reverseOrder) {
    displayedComments = [...displayedComments].reverse();
  }

  const lastCommentIndex = displayedComments.length - 1;

  return (
    <>
      <ul role="list" className="mb-2 ml-[10px] space-y-2">
        {displayedComments.map((comment, index) => (
          <li className="relative flex gap-x-4" key={comment.id}>
            <div
              className={`absolute left-0 top-0 flex w-6 justify-center ${
                thread && loggedIn
                  ? `-bottom-6`
                  : `${index === lastCommentIndex ? "h-6" : "-bottom-6"} `
              }`}
            >
              <div className="w-px bg-gray-200" />
            </div>
            <img
              src={comment.user?.profileImageUrl}
              alt=""
              className="relative mt-2 h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <div className="flex rounded-md bg-[#cacee788] p-2">
              <Link href={`/chan/${slug}/posts/${postId}`}>
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {comment.user?.firstName || comment.user?.lastName
                        ? `${comment.user?.firstName} ${comment.user?.lastName}`
                        : "Anonymous"}
                    </span>{" "}
                    commented&nbsp;
                    {userId === comment.userId ? (
                      <CommentDeleteButton
                        className="self-center"
                        postId={comment.postId}
                        commentId={comment.id}
                        onComplete={refresh}
                      />
                    ) : null}
                  </div>
                  <time
                    dateTime={
                      comment.createdAt
                        ? new Date(comment.createdAt).toISOString()
                        : ""
                    }
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString([], {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      : ""}
                  </time>
                </div>
                <p className="font-sans text-sm leading-6 text-gray-500">
                  {comment.content}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {showMoreComments && count > limit && (
        <div className="mb-2 ml-14 font-sans text-xs">
          {count - limit} more comment
          {count - limit > 1 ? "s" : ""}
        </div>
      )}
    </>
  );
}
