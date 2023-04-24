import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export const PATCH = async (req: Request) => {
  const res = await req.json();

  try {
    await db.project.update({
      where: { id: res.projectId },
      data: {
        deleted: true,
      },
    });

    return new Response(JSON.stringify("Success"), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify("Failed delete Project"), {
      status: 401,
    });
  }
};

export const POST = async (req: Request) => {
  const res = await req.json();

  const nextCookies = cookies();
  const cookie = nextCookies.get(process.env.COOKIE_NAME);

  const user = await validateJWT(cookie?.value);

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
