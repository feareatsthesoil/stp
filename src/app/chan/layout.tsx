"use client";

import Footer from "@/components/foundation/footer/Footer";
import NavBar from "@/components/foundation/nav/Nav";
import PostForm from "@/components/chan/posts/PostForm";
import { UserContext } from "@/components/userContext";
import usePageLoader from "@/hooks/usePageLoader";
import { useParams } from "next/navigation";
import { ReactNode, useContext } from "react";
interface ChanLayoutProps {
  children: ReactNode;
}

export default function ChanLayout(props: ChanLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;
  const { slug } = useParams();

  const slugToString = Array.isArray(slug) ? slug[0] : slug || "gc";
  return (
    <>
      <div
        className={`mx-4 flex min-h-[100vh] flex-col items-center bg-[#F4F4FE]`}
      >
        <NavBar />
        <div className="flex w-full flex-row place-content-center border-[0] border-b border-solid border-slate-300 pb-2 pt-4 text-sm font-bold">
          <PostForm slug={slugToString} />
        </div>
        <div className="w-full">{!loading && props.children}</div>
        <Footer />
      </div>
    </>
  );
}
