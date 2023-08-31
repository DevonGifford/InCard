//- https://next-auth.js.org/configuration/nextjs#middleware
//👇 simple usage - when you want to require authentication for your entire site:
export { default } from "next-auth/middleware"

//👇 secure certain pages - export a config object with a matcher:
export const config = { matcher: ["/a-server-page-example", "/a-client-page-example"] }