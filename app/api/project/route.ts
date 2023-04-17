import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const res = await req.json();

  const nextCookies = cookies();
  const cookie = nextCookies.get(process.env.COOKIE_NAME);

  console.log(cookie, "cooooooooookie");

  const user = await validateJWT(cookie?.value);

  console.log(res, "res");
  console.log(user, "user");
  console.log(" made it hereeeeeeeeeeeeeeeeeeeee");
  try {
    const project = await db.project.create({
      data: {
        name: res.name,
        ownerId: user.id,
      },
    });

    return new Response(JSON.stringify("Success"), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify("Failed Project"), {
      status: 401,
    });
  }
};
