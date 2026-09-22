import { NextResponse } from "next/server";
import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { pathname } = (await request.json()) as { pathname?: string };
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    const clientToken = await generateClientTokenFromReadWriteToken({
      pathname,
      token: process.env.dexy2_READ_WRITE_TOKEN,
      allowedContentTypes: ["image/*", "video/*"],
      addRandomSuffix: true,
      maximumSizeInBytes: 200 * 1024 * 1024, // 200MB
    });
    return NextResponse.json({ clientToken });
  } catch (err) {
    console.error("Blob token generation failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
