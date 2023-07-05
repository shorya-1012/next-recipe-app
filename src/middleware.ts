import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/sign-in", "/user/:path*", "/recipes/:path*", "/api/webhooks/user", "/api/uploadthing", "/api/get-posts:path*", "/search/:path*"]
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 
