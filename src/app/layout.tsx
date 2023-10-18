import { AllClientContexts } from "@/components/AllClientContexts";
import { UserProvider } from "@/components/userContext";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

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
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
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
