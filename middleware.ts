import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string | Uint8Array) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //@ts-expect-error ts error
  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  if (
    (jwt && pathname.startsWith("/signin")) ||
    pathname.startsWith("/register")
  ) {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  //allows these paths to be accessed without a jwt
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // if (pathname.startsWith("/signin") || pathname.startsWith("/register")) {
  //   if (jwt) {
  //     req.nextUrl.pathname = "/home";
  //     return NextResponse.redirect(req.nextUrl);
  //   } else {
  //     return NextResponse.next();
  //   }
  // }

  if (!jwt) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  } else if (pathname.endsWith("/")) {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}
