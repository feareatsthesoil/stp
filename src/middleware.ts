import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/404",
    "/login",
    "/chan",
    "/chan/:slug",
    "/chan/:slug/post/:id",
    "/access",
    "/support",
    "/community",
    "/blog",
    "/store",
    "/meetings",
    "/philosophy",
    "/proposals",
    "/contact",
    "/mission",
    "/support",
    "/podcast",
    "/foundation",
    "/api/verify/meta",
    "/api/verify/verify-seed",
    "/api/boards",
    "/api/boards/:slug",
    "/api/boards/:slug/posts",
    "/api/boards/:slug/posts/:id",
    "/api/checkout/create",
    "/api/membership/grant",
    "/api/posts",
    "/api/posts/:id/comments",
    "/api/posts/:id/comments/:cid",
  ],
  signInUrl: process.env.NEXT_PUBLIC_API_URL + "/login",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
