import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import PostForm from "../Posts/PostForm";
import { UserContext } from "../UserContext";

interface ChanLayoutProps {
  children: ReactNode;
}
declare global {
  interface Window {
    isRunningInWebView: boolean;
  }
}

export default function ChanLayout(props: ChanLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;
  const router = useRouter();
  const [isRunningInWebView, setIsRunningInWebView] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.includes("MyAppWebView")) {
      setIsRunningInWebView(true);
    }
  }, []);

  const {
    query: { slug },
  } = router;
  const slugToString = Array.isArray(slug) ? slug[0] : slug || "gc";

  return (
    <div
      className={`mx-4 flex min-h-[100svh] flex-col items-center bg-[#F4F4FE]`}
    >
      {!isRunningInWebView && <Nav />}
      <div className="flex w-full flex-row place-content-center border-[0] border-b border-solid border-slate-300 pb-2 pt-4 text-sm font-bold">
        <PostForm slug={slugToString} />
      </div>
      <div className="w-full">{!loading && props.children}</div>
      <Footer />
    </div>
  );
}
