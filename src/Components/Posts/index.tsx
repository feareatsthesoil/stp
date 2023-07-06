import { useAuth } from "@clerk/nextjs";
import { UploadcareSimpleAuthSchema, storeFile } from "@uploadcare/rest-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PostResponse } from "../../types";
import { getPosts } from "../../utils/services";
import Comments from "../Comments";

interface Props {
  slug: string;
  query: string;
  isCatalogView: boolean;
}

const extractUUID = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

export default function Posts({
  slug,
  query,
  isCatalogView,
}: {
  slug: string;
  query: string;
  isCatalogView: boolean;
}) {
  const { userId } = useAuth();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [uploadDetails, setUploadDetails] = useState<{
    [key: string]: {
      filename: string;
      size: string;
      height: string;
      width: string;
      url: string;
    };
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [expandedImages, setExpandedImages] = useState<Record<string, boolean>>(
    {}
  );

  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
    publicKey: "298fc65a2986318fd270",
    secretKey: "7fbd6a8d67fd36cf527c",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts(slug, query);
        setPosts(fetchedPosts);

        for (let post of fetchedPosts) {
          if (post.attachment) {
            const uuid = extractUUID(post.attachment);
            const result = await storeFile(
              { uuid },
              { authSchema: uploadcareSimpleAuthSchema }
            );
            fetch(`https://ucarecdn.com/${uuid}/-/json/`)
              .then((response) => response.json())
              .then((data) => {
                setUploadDetails((prevState) => ({
                  ...prevState,
                  [post.id]: {
                    filename: result.originalFilename,
                    size: result.size.toString(),
                    url: result.originalFileUrl,
                    height: data.height,
                    width: data.width,
                  },
                }));
              })
              .catch((error) =>
                console.error("Error fetching upload details:", error)
              );
          }
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug, query]);

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;
  if (!posts.length) return <>No posts found</>;
  return (
    <>
      <div
        className={
          isCatalogView
            ? " grid-rows-10 grid grid-cols-1 gap-2 py-2 text-center sm:grid-cols-2 min-[1000px]:grid-cols-3 min-[1350px]:grid-cols-4 min-[1650px]:grid-cols-5 min-[2050px]:grid-cols-6 min-[2350px]:grid-cols-7 min-[2650px]:grid-cols-8 min-[2950px]:grid-cols-9 min-[3250px]:grid-cols-10 min-[3550px]:grid-cols-11 min-[3850px]:grid-cols-12"
            : ""
        }
      >
        {posts?.map((post, index) => (
          <div
            className={`${
              isCatalogView
                ? "tile w-full justify-center border-x border-y border-solid border-slate-300 sm:w-min"
                : `pb-2 ${
                    index !== 0 ? "border-t border-solid border-slate-300" : ""
                  }`
            }flex w-full flex-col border-slate-300 pt-1 md:flex-row`}
          >
            <div
              className={`flex flex-col ${isCatalogView ? "" : ""} ${
                expandedImages[post.id] ? "flex-col md:flex-col" : "md:flex-row"
              }`}
            >
              <div className="flex w-full flex-col">
                <div className="flex min-w-max flex-row py-0.5 text-xs leading-5 text-gray-500">
                  <img
                    src={post.user?.profileImageUrl || "/favicon.ico"}
                    alt=""
                    className={`${
                      isCatalogView && "ml-2"
                    } relative mr-2 h-6 w-6 flex-none rounded-full bg-gray-50`}
                  />
                  <span className="self-center font-medium text-gray-900">
                    {post.user?.firstName || post.user?.lastName
                      ? `${post.user?.firstName} ${post.user?.lastName}`
                      : "Anonymous"}
                  </span>
                  <p className="self-center"> &nbsp;posted @&nbsp;</p>
                  <time
                    dateTime={
                      post.createdAt
                        ? new Date(post.createdAt).toISOString()
                        : ""
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
                    className="ml-2 mr-1 self-center text-sm font-semibold text-black hover:underline"
                  >
                    [More]
                  </Link>
                  {userId === post.userId ? (
                    <Link
                      className="mr-1 self-center text-sm font-bold text-blue-600 hover:underline"
                      href={`/chan/${slug}/posts/${post.id}/edit`}
                    >
                      [Edit]
                    </Link>
                  ) : null}
                  {post.attachment && !isCatalogView && (
                    <>
                      <button
                        className="mr-2 text-sm text-gray-500 focus:outline-none"
                        onClick={() =>
                          setExpandedImages((prevState) => ({
                            ...prevState,
                            [post.id]: !prevState[post.id],
                          }))
                        }
                      >
                        {expandedImages[post.id] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#000"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="#000"
                            className="h-5 w-5"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                        )}
                      </button>
                    </>
                  )}
                </div>
                <div
                  className={`items-left flex flex-col ${
                    expandedImages[post.id] ? "" : ""
                  }`}
                >
                  <p className="text-sm text-gray-700">
                    {post.attachment && (
                      <>
                        <div
                          className={`flex ${
                            isCatalogView ? "justify-center" : ""
                          }`}
                        >
                          <img
                            className={`max-h-[96vh] pt-2 ${
                              isCatalogView
                                ? "max-h-[300px] max-w-[300px] self-center"
                                : ""
                            } ${
                              expandedImages[post.id] ? "" : "max-w-[300px]"
                            }`}
                            src={post.attachment}
                          />
                        </div>
                        <ul
                          className={`t-3 flex pt-2 ${
                            isCatalogView ? "justify-center" : ""
                          }`}
                        >
                          <li className="h-4 min-w-max self-center border-[0] border-r-[1px] border-solid border-black pr-1 text-xs">
                            {uploadDetails[post.id]?.width}&nbsp;x&nbsp;
                            {uploadDetails[post.id]?.height}&nbsp;
                          </li>
                          <li className="h-4 min-w-max self-center border-[0] border-r-[1px] border-solid border-black px-1 text-xs">
                            {uploadDetails[post.id]?.size}&nbsp;kb&nbsp;
                          </li>
                          <li className="h-4 min-w-max self-center px-1 text-xs">
                            <a
                              href={uploadDetails[post.id]?.url}
                              className="text-blue-600 underline hover:text-indigo-600"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {uploadDetails[post.id]?.filename}
                            </a>
                          </li>
                        </ul>
                      </>
                    )}
                  </p>
                  <Link
                    className="pt-1"
                    href={`/chan/${slug}/posts/${post.id}`}
                  >
                    <h3
                      className={`${
                        isCatalogView && "pb-2"
                      } text-lg font-medium leading-5 text-gray-900 hover:underline`}
                    >
                      {post.title}
                    </h3>
                  </Link>
                  <div
                    className={`text-md mb-2 py-1 text-gray-500 md:mb-0 ${
                      isCatalogView && `${post.attachment ? "hidden" : "px-2"}`
                    }`}
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                  />
                </div>
              </div>
              {isCatalogView ? null : (
                <div
                  className={`float-right ml-[-10px] w-full md:mx-2 md:ml-0 ${
                    expandedImages[post.id] ? "" : "md:mt-1"
                  }`}
                >
                  <div className="ml-2 h-full md:border-l-[1px] md:border-solid md:border-slate-200">
                    <Comments
                      id={post.id}
                      slug={slug}
                      postId={post.id}
                      limit={3}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
