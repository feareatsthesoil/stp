import Footer from "@/Components/Footer/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/Components/Nav/Nav";
import { UserProvider } from "@/Components/UserContext";
import { ClerkProvider } from "@clerk/nextjs";
import { AllClientContexts } from "@/Components/AllClientContexts";

export const metadata: Metadata = {
  title: "Serving the People",
  description: "Portal for SERVING the PEOPLE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Portal for SERVING the PEOPLE" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="keywords" content="Keywords" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="">
          <AllClientContexts>
            <ClerkProvider
              publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            >
              <UserProvider>{children}</UserProvider>
            </ClerkProvider>
          </AllClientContexts>
        </div>
      </body>
    </html>
  );
}
