import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that do NOT require authentication
const isPublicRoute = createRouteMatcher([
  '/',               // ✅ Homepage is public
  '/sign-in(.*)',    // ✅ Clerk sign-in
  '/sign-up(.*)',    // ✅ Clerk sign-up
  
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    '/((?!_next|.*\\..*).*)',
    // Always protect API and trpc routes
    '/(api|trpc)(.*)',
  ],
};
