import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import BoardPills from "../Boards/BoardPills";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../Nav/Nav";
import PostForm from "../Posts/PostForm";
import { UserContext } from "../UserContext";
import css from "./DefaultLayout.module.css";

interface ChanLayoutProps {
  children: ReactNode;
}

export default function ChanLayout(props: ChanLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  const router = useRouter();
  const { loggedIn } = useContext(UserContext);

  const {
    query: { slug, name },
  } = router;
  const slugToPost = slug ?? "all";
  const slugToString = Array.isArray(slugToPost) ? slugToPost[0] : slugToPost;

  return (
    <div className={css.body}>
      <Header />
      <NavBar />
      <div className="flex w-[96vw] flex-row place-content-center border-[0] border-b border-solid border-slate-300 pt-2 text-sm font-bold">
        <PostForm slug={slugToString} />
      </div>
      <BoardPills slug={String(slug!)} />
      <div>{!loading && props.children}</div>
      <Footer />
    </div>
  );
}
