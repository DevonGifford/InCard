export { default } from "next-auth/middleware";

// secure certain pages - export a config object with a matcher:
export const config = { matcher: ["/dashboard"] };

