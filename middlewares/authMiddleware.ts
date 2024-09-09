import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const isLoginURL = ["/sign-in", "/sign-up"];

export const authMiddleware = (
  middleware: NextMiddleware,
  requestAuth: string[] = []
) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requestAuth.includes(pathname)) {
      const token = req.cookies.get("__session");
      if (!token && !isLoginURL.includes(pathname)) {
        const url = new URL("/sign-in", req.url);
        url.searchParams.set("callback", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token && isLoginURL.includes(pathname)) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
};
