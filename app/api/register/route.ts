import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";

export const GET = async (request: Request, response) => {
  // response.status(209);
  return new Response("Hello, from register Next.js!");
};

export const POST = async (req: Request) => {
  const res = await req.json();

  const user = await db.user.create({
    data: {
      email: res.email,
      password: await hashPassword(res.password),
      firstName: res.firstName,
      lastName: res.lastName,
    },
  });

  const jwt = await createJWT(user);

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Set-Cookie": serialize(process.env.COOKIE_NAME, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
};
