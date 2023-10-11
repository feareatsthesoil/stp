import Footer from "@/Components/Footer/Footer";
import type { Metadata } from "next";
import NavBar from "@/Components/Nav/Nav";

export const metadata: Metadata = {
  title: "Serving the People",
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
