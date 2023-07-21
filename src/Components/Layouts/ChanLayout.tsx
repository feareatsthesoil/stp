import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import BoardPills from "../Boards/BoardPills";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../Nav/Nav";
import PostForm from "../Posts/PostForm";
import { UserContext } from "../UserContext";
import css from "./DefaultLayout.module.css";
import { PostResponse } from "../../types";

interface ChanLayoutProps {
  children: ReactNode;
}

export default function ChanLayout(props: ChanLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  const router = useRouter();

  async function generatePostResponse(
    slug: string
  ): Promise<PostResponse | undefined> {
    const response = await fetch(`/api/posts/${slug}`);
    const data = await response.json();

    if (!data.id || !data.content) {
      return undefined;
    }

    const postResponse: PostResponse = {
      ...data,
      user: data.user || undefined,
      board: data.board || undefined,
    };

    return postResponse;
  }

  const {
    query: { slug },
  } = router;
  const slugToString = Array.isArray(slug) ? slug[0] : slug || "gc";

  const [slugToPost, setSlugToPost] = useState<PostResponse | undefined>();

  useEffect(() => {
    generatePostResponse(slugToString).then((postResponse) =>
      setSlugToPost(postResponse)
    );
  }, [slugToString]);

  return (
    <div className={css.body}>
      <Header />
      <NavBar />
      <div className="flex w-[96vw] flex-row place-content-center border-[0] border-b border-solid border-slate-300 pb-2 pt-4 text-sm font-bold">
        <PostForm slug={slugToString} post={slugToPost} />
      </div>
      <BoardPills slug={String(slug!)} currentPath={router.asPath} />
      <div>{!loading && props.children}</div>
      <Footer />
    </div>
  );
}
