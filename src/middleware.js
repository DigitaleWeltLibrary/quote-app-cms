import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/helpauth";

export async function middleware(request) {
  const cookies = request.cookies;
  const session = cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decryptedSession = await decrypt(session);

    if (!decryptedSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Fehler beim Entschlüsseln des Sessions:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
