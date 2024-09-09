import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";

export const mainMiddleware = () => {
  const res = NextResponse.next();
  return res;
};

export default authMiddleware(mainMiddleware, ["/", "/sign-in", "/sign-up"]);
