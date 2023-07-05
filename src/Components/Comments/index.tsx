import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { Comment } from "@prisma/client";
import { useEffect, useState } from "react";
import { CommentResponse } from "../../types";
import { getComments } from "../../utils/services";
import CommentDeleteButton from "./CommentDeleteButton";
import LikeButton from "../LikeButton";
import Link from "next/link";

export default function Comments({
  id,
  limit,
  slug,
  postId,
}: {
  id: number;
  limit?: number;
  slug: string;
  postId: number;
}) {
  const { userId } = useAuth();
  const [comments, setComments] = useState<CommentResponse[]>();
  const { user } = useUser();
  const refresh = () => {
    getComments(id).then((data) => setComments(data));
  };
  useEffect(() => {
    refresh();
  }, [id]);

  if (!comments || comments.length === 0) return null;

  const displayedComments = limit ? comments.slice(0, limit) : comments;
  const lastCommentIndex = displayedComments.length - 1;

  return (
    <>
      <ul role="list" className="space-y-2">
        {displayedComments.map((comment, index) => (
          <li className="relative flex gap-x-4" key={comment.id}>
            <div
              className={`${
                index === lastCommentIndex ? "h-6" : "-bottom-6"
              } absolute left-0 top-0 flex w-6 justify-center`}
            >
              <div className="w-px bg-gray-200" />
            </div>
            <img
              src={comment.user?.profileImageUrl}
              alt=""
              className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <div className="flex-grow rounded-md p-2 ring-1 ring-inset ring-gray-200">
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
                <p className="text-sm leading-6 text-gray-500">
                  {comment.content}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
