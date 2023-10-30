import Footer from "@/components/foundation/footer/Footer";
import NavBar from "@/components/foundation/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serving the People",
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-4 flex min-h-[100svh] flex-col items-center">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
