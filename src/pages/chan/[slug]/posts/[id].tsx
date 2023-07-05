import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../../../Components/Layouts/DefaultLayout";
import { PostResponse } from "../../../../types";
import { UserContext } from "../../../../Components/UserContext";
import { useRouter } from "next/router";
import { getBoard, getPost } from "../../../../utils/services";
import { Boards } from "@prisma/client";
import Comments from "../../../../Components/Comments";
import CommentForm from "../../../../Components/Comments/CommentForm";
import { UploadcareSimpleAuthSchema, storeFile } from "@uploadcare/rest-client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const extractUUID = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

export default function PostViewPage() {
  const router = useRouter();
  const { id, slug } = router.query;
  const { userId } = useAuth();
  const [post, setPost] = useState<PostResponse>();
  const { loggedIn } = useContext(UserContext);
  const [uploadDetails, setUploadDetails] = useState<{
    [key: string]: {
      filename: string;
      size: string;
      height: string;
      width: string;
      url: string;
    };
  }>({});

  const [version, setVersion] = useState(1);
  const [board, setBoard] = useState<Boards>();
  let stringSlug = Array.isArray(slug) ? slug[0] : slug;
  stringSlug = stringSlug || "defaultSlug";

  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
    publicKey: "298fc65a2986318fd270",
    secretKey: "7fbd6a8d67fd36cf527c",
  });

  useEffect(() => {
    if (id)
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
        if (data.attachment) {
          const uuid = extractUUID(data.attachment);
          storeFile({ uuid }, { authSchema: uploadcareSimpleAuthSchema }).then(
            (result) => {
              fetch(`https://ucarecdn.com/${uuid}/-/json/`)
                .then((response) => response.json())
                .then((data) => {
                  setUploadDetails((prevState) => ({
                    ...prevState,
                    [uuid]: {
                      filename: result.originalFilename,
                      size: result.size.toString(),
                      url: result.originalFileUrl || "",
                      height: data.height.toString(),
                      width: data.width.toString(),
                    },
                  }));
                })
                .catch((error) =>
                  console.error("Error fetching upload details:", error)
                );
            }
          );
        }
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
      <Link className="hover:underline" href="/chan">
        [Back]
      </Link>
      <div className="flex flex-row py-0.5 pt-2 text-xs leading-5 text-gray-500">
        <img
          src={post.user?.profileImageUrl || "/favicon.ico"}
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
          <>
            <img className="max-h-[500px] pb-2" src={post.attachment} />
            <ul className="t-3 flex  justify-center [&>li]:h-4 [&>li]:min-w-max [&>li]:self-center [&>li]:border-[0] [&>li]:border-r-[1px] [&>li]:border-solid [&>li]:border-black [&>li]:px-1 [&>li]:text-gray-600">
              <li>
                {uploadDetails[extractUUID(post.attachment)]?.width}
                &nbsp;x&nbsp;
                {uploadDetails[extractUUID(post.attachment)]?.height}&nbsp;
              </li>
              <li>
                {uploadDetails[extractUUID(post.attachment)]?.size}
                &nbsp;kb&nbsp;
              </li>
              <li>{uploadDetails[extractUUID(post.attachment)]?.filename}</li>
            </ul>
          </>
        )}
        <p>{post.content}</p>
      </div>
      <Comments
        key={version}
        id={Number(id)}
        slug={stringSlug}
        postId={post.id}
      />
      {loggedIn && (
        <CommentForm
          onComplete={() => setVersion((v) => v + 1)}
          id={Number(id)}
        />
      )}
    </DefaultLayout>
  );
}
