import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const pathnameParts = req.nextUrl.pathname.split("/")
  let user = 'url'
  const slug = pathnameParts.pop()
  // Get pathname:
  if (pathnameParts.length > 1) {
    const username = pathnameParts.pop() || 's'
    if (username !== 's') {
      user = username
    }
  }

  // Get data from query:
  const data = await fetch(`${req.nextUrl.origin}/api/${user}/${slug}`);

  // Return (/) if not found (404):
  if (data.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  // Convert data to JSON:
  const dataToJson = await data.json();

  if (data?.url) {
    return NextResponse.redirect(new URL(dataToJson.url));
  }
}

export const config = {
  matcher: ["/s/:slug*", '/((?!dash|api|_next/static|_next/image|img|fonts|manifest|auth|favicon.ico).*)'],
};
