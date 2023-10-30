import { AllClientContexts } from "@/Components/AllClientContexts";
import { UserProvider } from "@/Components/userContext";
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
      <body>
        <div>
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
