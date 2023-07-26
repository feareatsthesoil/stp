import { Boards } from "@prisma/client";
import { UploadcareSimpleAuthSchema, storeFile } from "@uploadcare/rest-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Comments from "../../../../Components/Comments";
import CommentForm from "../../../../Components/Comments/CommentForm";
import DefaultLayout from "../../../../Components/Layouts/DefaultLayout";
import { PostResponse } from "../../../../types";
import { getBoard, getPost } from "../../../../utils/services";
import { useAuth } from "@clerk/nextjs";
import React from "react";

const extractUUID = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

const linkify = (text: string): string => {
  const linkRegex = /<a href=".+">(.+)<\/a>/g;

  if (linkRegex.test(text)) {
    return text;
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let linkedText = text.replace(urlRegex, function (url: string): string {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-indigo-500">${url}</a>`;
  });

  linkedText = linkedText.replace(/\n/g, "<br />");

  return linkedText;
};

export default function PostViewPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const { id, slug } = router.query;
  const [post, setPost] = useState<PostResponse>();
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
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [isAttachmentInfoVisible, setIsAttachmentInfoVisible] = useState(true);

  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
    secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY!,
  });

  const formatFileSize = (fileSizeInBytes: number) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    let sizeIndex = 0;
    while (fileSizeInBytes >= 1024 && sizeIndex < sizes.length - 1) {
      fileSizeInBytes /= 1024;
      sizeIndex++;
    }

    const formattedSize = `${fileSizeInBytes.toFixed(2)} ${sizes[sizeIndex]}`;

    console.log(
      `formatFileSize input: ${
        fileSizeInBytes * Math.pow(1024, sizeIndex)
      }, output: ${formattedSize}`
    );
    return formattedSize;
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setPost(undefined);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (id)
      getPost(slug as string, Number(id) as number).then((data) => {
        setPost(data);
        if (data.attachment) {
          const uuid = extractUUID(data.attachment);
          storeFile({ uuid }, { authSchema: uploadcareSimpleAuthSchema }).then(
            (result) => {
              fetch(`https://ucarecdn.com/${uuid}/-/json/`)
                .then((response) => response.text())
                .then((text) => {
                  return JSON.parse(text);
                })
                .then((data) => {
                  setUploadDetails((prevState) => ({
                    ...prevState,
                    [uuid]: {
                      filename: result.originalFilename,
                      size: formatFileSize(result.size),
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

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const reachedBottom = scrollTop + windowHeight >= scrollHeight;
    setIsAtBottom(reachedBottom);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (slug) getBoard(slug as string).then((data) => setBoard(data));
  }, [slug]);
  if (!post)
    return (
      <DefaultLayout>
        <p className="my-2">Loading...</p>
      </DefaultLayout>
    );

  const handleImageClick = () => {
    setIsAttachmentInfoVisible(!isAttachmentInfoVisible);
  };

  let postSlug = post.board?.slug;

  const postContent = post ? linkify(post?.content ?? "") : "";

  return (
    <DefaultLayout>
      <div className="sticky top-0 z-50 flex w-[96vw] justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] py-1 text-sm font-bold">
        <Link
          className="font-black hover:underline"
          href="javascript:void(0);"
          onClick={handleGoBack}
        >
          <button
            type="submit"
            color="rgb(239, 240, 240)"
            className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
          >
            Back
          </button>
        </Link>
        {post.isAuthor ? (
          <Link href={`/chan/${postSlug}/posts/${post.id}/edit`}>
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
            >
              Edit
            </button>
          </Link>
        ) : null}
        <Link
          className="hover:underline"
          href="javascript:void(0);"
          onClick={isAtBottom ? scrollToTop : scrollToBottom}
        >
          <button
            type="submit"
            color="rgb(239, 240, 240)"
            className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
          >
            {isAtBottom ? "Top" : "Bottom"}
          </button>
        </Link>
      </div>
      <div className="mx-1 flex flex-col items-center text-center">
        <div className="mb-2 max-w-[80vw]">
          <h1 className="mt-4 font-sans text-lg font-bold">{post.title}</h1>
          <div
            className="scrollbar-hide mt-2 overflow-x-auto overflow-y-hidden font-sans"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
          {post.attachment && (
            <div className="flex flex-col items-center">
              <img
                className={`w-[${
                  isAttachmentInfoVisible ? "600px" : "150px"
                }] pb-2 pt-4 hover:cursor-pointer`}
                src={post.attachment}
                onClick={handleImageClick}
              />
              {isAttachmentInfoVisible && (
                <ul className="scrollbar-hide mt-4 flex max-w-[80vw]  flex-row overflow-x-auto overflow-y-hidden [&>li]:h-4 [&>li]:self-center [&>li]:text-gray-600">
                  <li className="border-[0] border-r-[1px] border-solid border-black pr-1">
                    {uploadDetails[extractUUID(post.attachment)]?.width}
                    &nbsp;x&nbsp;
                    {uploadDetails[extractUUID(post.attachment)]?.height}&nbsp;
                  </li>
                  <li className="min-w-max border-[0] border-r-[1px] border-solid border-black px-1">
                    {uploadDetails[extractUUID(post.attachment)]?.size}
                  </li>
                  <li className="px-1">
                    <a
                      href={uploadDetails[extractUUID(post.attachment)]?.url}
                      className="text-blue-600 underline hover:text-indigo-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {uploadDetails[extractUUID(post.attachment)]?.filename}
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
          <div className="relative mt-8 flex flex-row py-0.5 pt-2 text-xs leading-5 text-gray-500">
            <div className="absolute -bottom-2 left-0 top-0 flex w-6 justify-center">
              <div className="w-px bg-slate-200" />
            </div>
            <img
              src={post.user?.profileImageUrl || "/favicon.ico"}
              alt=""
              className="relative mt-[5px] h-6 w-6 flex-none rounded-full bg-gray-50"
            />
            <div className="mb-[-2px] ml-4 flex overflow-auto rounded-md bg-[#dbddffa5] p-2">
              <span className="min-w-max self-center font-sans font-medium text-gray-900">
                {post.user?.firstName || post.user?.lastName
                  ? `${post.user?.firstName} ${post.user?.lastName}`
                  : "Anonymous"}
              </span>
              <p className="min-w-max self-center font-sans text-gray-500">
                {" "}
                &nbsp;posted @&nbsp;
              </p>
              <time
                dateTime={
                  post.createdAt ? new Date(post.createdAt).toISOString() : ""
                }
                className="min-w-max self-center text-gray-500"
              >
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString([], {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : ""}
              </time>
            </div>
          </div>
          <div className="ml-[-10px] mt-2 text-left">
            <Comments
              thread={true}
              reverseOrder
              key={version}
              id={Number(id)}
              slug={stringSlug}
              postId={post.id}
            />
          </div>
          <CommentForm
            onComplete={() => setVersion((v) => v + 1)}
            id={Number(id)}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}
