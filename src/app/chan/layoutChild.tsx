"use client";

import PostForm from "@/components/chan/posts/PostForm";
import Footer from "@/components/foundation/footer/Footer";
import Header from "@/components/foundation/header/Header";
import { UserContext } from "@/components/userContext";
import usePageLoader from "@/hooks/usePageLoader";
import { useParams, usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";

interface ChanLayoutProps {
  children: ReactNode;
}

export default function ChanLayoutChild({ children }: ChanLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;
  const { slug } = useParams();
  const pathname = usePathname();

  let showPostForm = false;
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length === 1 ||
    (segments.length === 2 && segments[0] === "chan")
  ) {
    showPostForm = true;
  }

  const slugToString = Array.isArray(slug) ? slug[0] : slug || "gc";
  return (
    <div className="bg-[#F4F4FE]">
      <div className="mx-4 flex min-h-[100vh] flex-col items-center">
        <Header showLogo={true} />
        <div className="flex w-full flex-row place-content-center border-[0] border-b border-solid border-slate-300 pb-2 pt-8 text-sm font-bold">
          {showPostForm && <PostForm slug={slugToString} />}
        </div>
        <div className="mb-8 w-full">{!loading && children}</div>
        <Footer />
      </div>
    </div>
  );
}
