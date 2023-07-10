import { useAuth } from "@clerk/nextjs";
import { Pagination } from "@mui/material";
import { UploadcareSimpleAuthSchema, storeFile } from "@uploadcare/rest-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PostResponse } from "../../types";
import { getPosts } from "../../utils/services";
import { colors } from "../Boards/colors";
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
    publicKey: "298fc65a2986318fd270",
    secretKey: "7fbd6a8d67fd36cf527c",
  });

  useEffect(() => {
    setLoading(true);
  }, [currentPage]);
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
  useEffect(() => {
    console.error({ currentPage });
    fetchPosts();
  }, [slug, query, currentPage]);
  if (loading) return <div className="my-2">Loading...</div>;
  if (error) return <>Error: {error.message}</>;
  if (!posts.length) return <>No posts found</>;
  return (
    <>
      <div
        className={
          isCatalogView
            ? "grid-rows-10 grid grid-cols-1 gap-2 py-2 text-center min-[800px]:grid-cols-2 min-[1400px]:grid-cols-3 min-[2000px]:grid-cols-4 min-[2600px]:grid-cols-5 min-[3200px]:grid-cols-6 min-[3800px]:grid-cols-7 min-[4400px]:grid-cols-8 min-[5000px]:grid-cols-9 min-[5600px]:grid-cols-10 min-[6200px]:grid-cols-11 min-[6800px]:grid-cols-12"
            : ""
        }
      >
        {posts?.map((post, index) => {
          let color = colors[index % colors.length];
          let postSlug = post.board?.slug;
          return (
            <div
              className={`${
                isCatalogView
                  ? "border-x border-y border-solid border-slate-300"
                  : `pb-auto ${
                      index !== 0
                        ? "border-t border-solid border-slate-300"
                        : ""
                    }`
              }flex w-full flex-col border-slate-300 pt-1 md:flex-row`}
            >
              <div className={`flex-col md:flex-col`}>
                <div className="flex w-full flex-col">
                  <div
                    className={`flex min-w-max flex-row py-0.5 text-xs leading-5 text-gray-500`}
                  >
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
                    <Link href={`/chan/${postSlug}`} passHref>
                      <button
                        style={{
                          backgroundColor: color,
                        }}
                        className={`w-15 relative ml-1 h-7 min-w-max rounded-md px-2 font-sans text-sm font-normal hover:opacity-80 sm:h-5 sm:text-xs`}
                      >
                        {post.board?.slug}
                      </button>
                    </Link>
                    <Link
                      href={`/chan/${postSlug}/posts/${post.id}`}
                      className="ml-2 mr-1 self-center text-sm font-semibold text-black hover:underline"
                    >
                      [More]
                    </Link>
                    {userId === post.userId ? (
                      <Link
                        className="mr-1 self-center text-sm font-bold text-blue-600 hover:underline"
                        href={`/chan/${postSlug}/posts/${post.id}/edit`}
                      >
                        [Edit]
                      </Link>
                    ) : null}
                  </div>
                  <div className={`items-left flex flex-col`}>
                    <Link
                      className="pt-1"
                      href={`/chan/${slug}/posts/${post.id}`}
                    >
                      <h3
                        className={`${
                          isCatalogView && "pb-2"
                        } font-sans text-lg font-medium leading-5 text-gray-900 hover:underline`}
                      >
                        {post.title}
                      </h3>
                    </Link>
                    <div
                      className={`text-md mb-1 py-1 font-sans text-gray-500 ${
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
                      <p className="text-sm text-gray-700">
                        {post.attachment && (
                          <>
                            <div className={`flex-col`}>
                              <img
                                className={`max-h-[96vh] pt-2 ${
                                  isCatalogView
                                    ? "max-h-[300px] max-w-[300px] self-center"
                                    : ""
                                } ${
                                  expandedImages[post.id] ? "" : "max-w-[300px]"
                                } cursor-pointer`}
                                src={post.attachment}
                                onClick={() =>
                                  setExpandedImages((prevState) => ({
                                    ...prevState,
                                    [post.id]: !prevState[post.id],
                                  }))
                                }
                              />

                              <ul className={`t-3 flex pb-2 pt-2`}>
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
                            </div>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {isCatalogView ? null : (
                  <div className={`mt-1 w-full`}>
                    <div className={` ml-[-10px]`}>
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
        <Pagination
          style={{ marginBottom: "10px" }}
          page={currentPage}
          count={totalPages}
          onChange={(e, p) => setCurrentPage(p)}
        />
      </div>
    </>
  );
}
