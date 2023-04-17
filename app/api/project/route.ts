import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  const res = await req.json();
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  try {
    const project = await db.project.create({
      data: {
        name: res.name,
        user: user.id,
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
