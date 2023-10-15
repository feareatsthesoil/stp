import Footer from "@/components/portal/footer/Footer";
import Header from "@/components/portal/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serving the People",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center bg-black">
      <Header />
      <div className="mx-4 sm:mx-10 max-w-[1000px] text-white">{children}</div>
      <Footer />
    </div>
  );
}
