import Footer from "@/components/foundation/footer/Footer";
import type { Metadata } from "next";
import NavBar from "@/components/foundation/nav/Nav";

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
