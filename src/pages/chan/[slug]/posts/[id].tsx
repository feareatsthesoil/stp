import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Boards } from "@prisma/client";
import { UploadcareSimpleAuthSchema, storeFile } from "@uploadcare/rest-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Comments from "../../../../Components/Comments";
import CommentForm from "../../../../Components/Comments/CommentForm";
import DefaultLayout from "../../../../Components/Layouts/DefaultLayout";
import { UserContext } from "../../../../Components/UserContext";
import { PostResponse } from "../../../../types";
import { getBoard, getPost } from "../../../../utils/services";

const extractUUID = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

export default function PostViewPage() {
  const router = useRouter();
  const { id, slug } = router.query;
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
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

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
      <div className="ml-[-2vw] flex w-[96vw] justify-center border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] text-sm font-bold">
        <h1 className="mb-4 text-lg font-semibold">{post.title}</h1>
      </div>
      <div className="sticky top-0 z-50 ml-[-2vw] flex w-[96vw] justify-between border-[0] border-b border-solid border-slate-300 bg-[#F4F4FE] text-sm font-bold">
        <Link className="font-black hover:underline" href="/chan">
          [Back]
        </Link>
        <Link
          className="hover:underline"
          href="javascript:void(0);"
          onClick={isAtBottom ? scrollToTop : scrollToBottom}
        >
          {isAtBottom ? "[Top]" : "[Bottom]"}
        </Link>
      </div>

      <div className="mb-2">
        {post.attachment && (
          <>
            <img
              className="max-h-[500px] pb-2 pt-[2vh]"
              src={post.attachment}
            />
            <ul className="t-3 flex [&>li]:h-4 [&>li]:min-w-max [&>li]:self-center [&>li]:text-gray-600">
              <li className="hidden border-[0] border-r-[1px] border-solid border-black pr-1 min-[450px]:block">
                {uploadDetails[extractUUID(post.attachment)]?.width}
                &nbsp;x&nbsp;
                {uploadDetails[extractUUID(post.attachment)]?.height}&nbsp;
              </li>
              <li className="border-[0] border-r-[1px] border-solid border-black px-1 ">
                {uploadDetails[extractUUID(post.attachment)]?.size}
                &nbsp;kb&nbsp;
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
          </>
        )}
        <p className="mt-[2vh]">{post.content}</p>
        <div className="relative mt-4 flex flex-row py-0.5 pt-2 text-xs leading-5 text-gray-500">
          <div className="absolute -bottom-2 left-0 top-0 flex w-6 justify-center">
            <div className="w-px bg-slate-200" />
          </div>
          <img
            src={post.user?.profileImageUrl || "/favicon.ico"}
            alt=""
            className="relative mt-[5px] h-6 w-6 flex-none rounded-full bg-gray-50"
          />
          <div className="mb-[-2px] ml-4 flex rounded-md bg-[#cacee788] p-2">
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
        </div>
      </div>
      <div className="ml-[-10px]">
        <Comments
          thread
          reverseOrder
          key={version}
          id={Number(id)}
          slug={stringSlug}
          postId={post.id}
        />
      </div>
      {loggedIn ? (
        <CommentForm
          onComplete={() => setVersion((v) => v + 1)}
          id={Number(id)}
        />
      ) : (
        <div className="mb-2 rounded-md bg-white p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-[#646475]"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-[#646475]">
                Please <u>log in</u> or <u>create an account</u> to comment.
              </p>
              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <a
                  href="/login"
                  className="whitespace-nowrap font-medium capitalize text-[#646475] hover:text-[#444451] "
                >
                  Log in / Sign Up
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
