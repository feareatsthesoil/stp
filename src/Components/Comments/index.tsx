import { useUser } from "@clerk/clerk-react";
import { Comment } from "@prisma/client";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/services";

export default function Comments({
  id,
  limit,
}: {
  id: number;
  limit?: number;
}) {
  const [comments, setComments] = useState<Comment[]>();
  const { user } = useUser();
  useEffect(() => {
    getComments(id).then((data) => setComments(data));
  }, [id]);

  if (!comments || comments.length === 0) return null;

  const displayedComments = limit ? comments.slice(0, limit) : comments;
  const lastCommentIndex = displayedComments.length - 1;

  return (
    <>
      <ul role="list" className="space-y-6">
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
              src="https://www.gravatar.com/avatar/?d=mp"
              alt=""
              className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
              <div className="flex justify-between gap-x-4">
                <div className="py-0.5 text-xs leading-5 text-gray-500">
                  <span className="font-medium text-gray-900">Guest</span>{" "}
                  commented
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
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
