import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/sign-in", "/user/:path*", "/recipes/:path*", "/api/webhooks/user", "/api/uploadthing", "/api/:path*", "/search/:path*", "/dashboard/:path*"]
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 
