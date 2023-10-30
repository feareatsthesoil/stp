import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostResponse } from "../../../types";
import linkify from "../../../utils/linkify";
import { getPosts } from "../../../utils/services";
import Comments from "../comments";
import PostAttachmentViewer from "./PostAttachmentViewer";
import { LoadingState } from "./PostsLoadingState";

interface Props {
  slug: string;
  query: string;
  isCatalogView: boolean;
}

export default function Posts({ slug, query, isCatalogView }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [showLoaderComponents, setShowLoaderComponents] =
    useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [slug, query, currentPage]);

  const fetchPosts = async () => {
    const timer = setTimeout(() => {
      setShowLoaderComponents(true);
    }, 200);

    try {
      if (slug) {
        const { data: fetchedPosts, headers } = await getPosts(
          slug,
          query,
          currentPage
        );
        const tpages = Number(headers["total-pages"]);
        setTotalPages(tpages);

        for (let post of fetchedPosts) {
          post.content = linkify(post.content || "");
        }
        setPosts(fetchedPosts);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error);
      setLoading(false);
    }

    clearTimeout(timer);
  };

  if (loading)
    return (
      <LoadingState
        showComponents={showLoaderComponents}
        isCatalogView={isCatalogView}
      />
    );
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
                      alt="User profile img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src =
                          "https://ucarecdn.com/8c962272-5ea0-425a-851a-8b834177ea26/";
                      }}
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
                          className={`w-15 ml-1 h-7 self-center rounded-md px-2 font-sans text-sm font-normal text-[#1d205e] hover:opacity-80 sm:h-5 sm:text-xs`}
                        >
                          {post.board?.slug}
                        </button>
                      </Link>
                      <Link href={`/chan/${postSlug}/post/${post.id}`}>
                        <button
                          type="submit"
                          color="rgb(239, 240, 240)"
                          className="w-15 ml-1 h-7 self-center rounded-md bg-[#eff0f0] px-2 font-sans text-sm font-normal text-[#4a4d50] hover:bg-[#e5e6e6] sm:h-5 sm:text-xs"
                        >
                          Reply
                        </button>
                      </Link>
                      {!isCatalogView && post.isAuthor ? (
                        <Link href={`/chan/${postSlug}/post/${post.id}/edit`}>
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
                    <Link href={`/chan/${postSlug}/post/${post.id}`}>
                      <h3
                        className={`${
                          isCatalogView ? "px-2" : ""
                        } scrollbar-hide overflow-x-auto overflow-y-hidden pt-2  font-sans text-lg font-bold leading-5 text-gray-900`}
                      >
                        {post.title}
                      </h3>
                    </Link>
                    <div
                      style={
                        isCatalogView ? {} : { width: "calc(100vw - 2rem)" }
                      }
                      className={`text-md scrollbar-hide mt-1 max-h-[500px] overflow-x-auto overflow-y-hidden font-sans text-black ${`${
                        post.attachments?.length > 0
                          ? isCatalogView && "hidden"
                          : ""
                      }`}`}
                      dangerouslySetInnerHTML={{
                        __html: linkify(post.content || ""),
                      }}
                    />
                    <div
                      className={`flex ${
                        isCatalogView ? "justify-center" : ""
                      }`}
                    >
                      <div
                        className={`text-center text-sm text-gray-700 ${
                          post.attachments?.length > 0 && "mt-2"
                        } ${isCatalogView && "mt-2"}`}
                      >
                        <PostAttachmentViewer
                          attachments={post.attachments}
                          isCatalogView={isCatalogView}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isCatalogView ? null : (
                  <div className={`mt-2 w-full`}>
                    <div className={`scrollbar-hide overflow-auto`}>
                      <Comments
                        showMoreComments={true}
                        id={post.id}
                        slug={slug}
                        postId={post.id}
                        limit={3}
                        homeComments={true}
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
