import { db } from "@/lib/db";
import { verifyToken } from "@clerk/clerk-sdk-node";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const verifyTokenOptions = {
  secretKey: process.env.CLERK_SECRET_KEY,
  // Add other required properties here
};

export const POST = async (req: Request) => {
  const cookieStore = cookies(); // Mendapatkan cookies dari request
  const token = cookieStore.get("__session"); // Nama cookie session dari Clerk

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const decodeUser = await verifyToken(
      token?.value as string,
      verifyTokenOptions
    );
    const userId = decodeUser.sub;
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
