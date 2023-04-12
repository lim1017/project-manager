import { db } from "@/lib/db";
import { comparePassword, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export const POST = async (req: Request) => {
  console.log("in route.ts for signin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  const res = await req.json();
  const user = await db.user.findUnique({
    where: {
      email: res.email,
    },
  });

  if (!user) {
    return new Response("User not found", {
      status: 401,
    });
  }

  const isUser = await comparePassword(res.password, user.password);

  if (isUser) {
    console.log("setting cookie after successful login");
    const jwt = await createJWT(user);
    return new Response("Successful login", {
      status: 200,
      headers: {
        "Set-Cookie": serialize(process.env.COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }),
      },
    });
  } else {
    return new Response("Incorrect login", {
      status: 401,
    });
  }
};
