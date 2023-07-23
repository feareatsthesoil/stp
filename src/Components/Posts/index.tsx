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

export default function Posts({ slug, query, isCatalogView }: Props) {
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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
    secretKey: process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY!,
  });

  const formatFileSize = (fileSizeInBytes: number) => {
    const sizes = ["B", "KB", "MB", "GB"];
    let sizeIndex = 0;
    while (fileSizeInBytes >= 1024 && sizeIndex < sizes.length - 1) {
      fileSizeInBytes /= 1024;
      sizeIndex++;
    }
    return `${fileSizeInBytes.toFixed(2)} ${sizes[sizeIndex]}`;
  };

  const fetchPosts = async () => {
    try {
      const { data: fetchedPosts, headers } = await getPosts(
        slug,
        query,
        currentPage
      );
      const tpages = Number(headers["total-pages"]);
      setTotalPages(tpages);
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
                  size: formatFileSize(result.size),
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

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [slug, query, currentPage]);

  if (loading) return <div className="my-2">Loading...</div>;
  if (error) return <div className="my-2">Error: {error.message}</div>;
  if (!posts.length) return <div className="my-2">No Posts Yet...</div>;

  return (
    <>
      <div
        className={`${
          isCatalogView
            ? "grid-rows-10 catCol10:-grid-cols-10 grid grid-cols-1 gap-2 py-2 text-center catCol2:grid-cols-2 catCol3:grid-cols-3 catCol4:grid-cols-4 catCol5:grid-cols-5 catCol6:grid-cols-6 catCol7:grid-cols-7 catCol8:grid-cols-8 catCol9:grid-cols-9 catCol11:grid-cols-11 catCol12:grid-cols-12"
            : ""
        }`}
      >
        {posts?.map((post, index) => {
          let postSlug = post.board?.slug;
          return (
            <div
              key={post.id}
              className={`${
                isCatalogView
                  ? "border-x border-y border-solid border-slate-300"
                  : `pb-auto ${
                      index !== 0
                        ? "border-t border-solid border-slate-300"
                        : "mt-2 "
                    }`
              }flex w-full flex-col border-slate-300 pt-1 md:flex-row`}
            >
              <div className="flex-col">
                <div className="flex w-full flex-col">
                  <div className="scrollbar-hide flex w-full flex-row overflow-x-auto py-0.5 text-xs leading-5 text-gray-500 ">
                    <img
                      src={post.user?.profileImageUrl || "/favicon.ico"}
                      alt=""
                      className={`${
                        isCatalogView && "ml-2"
                      } relative mr-2 h-6 w-6 flex-none rounded-full bg-gray-50`}
                    />
                    <span className="w-max self-center truncate font-sans font-medium text-gray-900">
                      {post.user?.firstName || post.user?.lastName
                        ? `${post.user?.firstName} ${post.user?.lastName}`
                        : "Anonymous"}
                    </span>
                    <p className="min-w-max self-center font-sans">
                      {" "}
                      &nbsp;posted @&nbsp;
                    </p>
                    <time
                      dateTime={
                        post.createdAt
                          ? new Date(post.createdAt).toISOString()
                          : ""
                      }
                      className="mb-[-1.5px] min-w-max self-center text-gray-500"
                    >
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString([], {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : ""}
                    </time>
                    <div className="min-w-max self-center">
                      <Link href={`/chan/${postSlug}`} passHref>
                        <button
                          style={{
                            backgroundColor: "#DBDDFF",
                          }}
                          className={`w-15 ml-1 h-7 self-center rounded-md px-2 font-sans text-sm font-normal text-black hover:opacity-80 sm:h-5 sm:text-xs`}
                        >
                          {post.board?.slug}
                        </button>
                      </Link>
                      <Link href={`/chan/${postSlug}/posts/${post.id}`}>
                        <button
                          type="submit"
                          color="rgb(239, 240, 240)"
                          className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
                        >
                          Reply
                        </button>
                      </Link>
                      {!isCatalogView && userId === post.userId ? (
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
                    </div>
                  </div>
                  <div className={`items-left flex flex-col`}>
                    <Link
                      className="pt-1"
                      href={`/chan/${slug}/posts/${post.id}`}
                    >
                      <h3
                        className={`${
                          isCatalogView ? "pb-2" : "pt-2"
                        } scrollbar-hide overflow-x-auto overflow-y-hidden font-sans text-lg font-medium leading-5 text-gray-900 hover:underline`}
                      >
                        {post.title}
                      </h3>
                    </Link>
                    <div
                      className={`text-md scrollbar-hide mb-1 mt-1 overflow-x-auto overflow-y-hidden py-1 font-sans text-black ${
                        isCatalogView &&
                        `${post.attachment ? "hidden" : "px-2"}`
                      }`}
                      dangerouslySetInnerHTML={{ __html: post.content || "" }}
                    />
                    <div
                      className={`flex ${
                        isCatalogView ? "justify-center" : ""
                      }`}
                    >
                      <div className="text-center text-sm text-gray-700">
                        {post.attachment && (
                          <>
                            <div className={`flex-col`}>
                              <img
                                className={`max-h-[96vh] pt-2 ${
                                  isCatalogView
                                    ? "max-h-[800px] max-w-[400px] mdMobileX:max-w-[80vw]"
                                    : "cursor-pointer"
                                } ${
                                  expandedImages[post.id] ? "" : "max-w-[300px]"
                                } `}
                                src={post.attachment}
                                onClick={() =>
                                  setExpandedImages((prevState) => ({
                                    ...prevState,
                                    [post.id]: !prevState[post.id],
                                  }))
                                }
                              />
                              <ul
                                className={`scrollbar-hide flex w-fit max-w-[95vw] flex-row overflow-x-auto pb-2 pt-2 ${
                                  isCatalogView ? "justify-center px-2" : ""
                                }`}
                              >
                                <li
                                  className={`h-4 w-max self-center border-[0] border-r-[1px] border-solid border-black pr-1 text-xs mdMobileX:hidden ${
                                    isCatalogView ? "max-[450px]:hidden" : ""
                                  }`}
                                >
                                  {uploadDetails[post.id]?.width}&nbsp;x&nbsp;
                                  {uploadDetails[post.id]?.height}&nbsp;
                                </li>
                                <li
                                  className={`h-4 min-w-max self-center border-[0] border-r-[1px] border-solid border-black px-1 text-xs mdMobileX:hidden ${
                                    isCatalogView ? "max-[450px]:hidden" : ""
                                  }`}
                                >
                                  {uploadDetails[post.id]?.size}
                                </li>
                                <li className="h-4 w-max self-center px-1 text-xs mdMobileX:px-0">
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
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {isCatalogView ? null : (
                  <div className={`mt-1 w-full`}>
                    <div className={` scrollbar-hide ml-[-10px] overflow-auto`}>
                      <Comments
                        showMoreComments={true}
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
          );
        })}
      </div>
      <nav
        className={`${
          isCatalogView
            ? "float-left mb-2"
            : "relative flex items-center justify-between border-[0] border-t border-solid border-slate-300 px-4 py-1 sm:px-0"
        }`}
        aria-label="Pagination"
      >
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            className={` ${
              currentPage === 1 &&
              "mr-1 cursor-not-allowed self-center opacity-50"
            }`}
          >
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className={`w-15 ml-0 mt-0 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:mt-1 sm:h-5 sm:text-xs ${
                currentPage === 1 && "cursor-not-allowed"
              } `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
                onMouseEnter={(e) => (e.currentTarget.style.strokeWidth = "2")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.strokeWidth = "1.5")
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </a>
          {Array.from(Array(totalPages).keys()).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <a
                key={pageNumber}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(pageNumber);
                }}
                className={`mx-1 self-center hover:font-bold ${
                  currentPage === pageNumber && "underline "
                }`}
              >
                <button
                  type="submit"
                  color="rgb(239, 240, 240)"
                  className={`w-15 h-7 self-center rounded-md px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs ${
                    currentPage === pageNumber ? "bg-[#dedede]" : "bg-[#eff0f0]"
                  }`}
                >
                  {pageNumber}
                </button>
              </a>
            );
          })}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            className={`${
              currentPage === totalPages &&
              "cursor-not-allowed self-center opacity-50"
            }`}
          >
            <button
              type="submit"
              color="rgb(239, 240, 240)"
              className={`w-15 ml-1 mt-0 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:mt-1 sm:h-5 sm:text-xs ${
                currentPage === totalPages && "cursor-not-allowed"
              } `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
                onMouseEnter={(e) => (e.currentTarget.style.strokeWidth = "2")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.strokeWidth = "1.5")
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}
