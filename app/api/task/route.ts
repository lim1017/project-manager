import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const res = await req.json();

  const nextCookies = cookies();
  const cookie = nextCookies.get(process.env.COOKIE_NAME);

  const user = await validateJWT(cookie?.value);

  console.log(res, "resssssssssssssssss");

  try {
    const task = await db.task.create({
      data: {
        name: res.name,
        ownerId: user.id,
        projectId: "b2a333f1-7ade-42d2-9549-1be4a574ffce",
        // projectId: res.projectId,
        description: res.description,
      },
    });

    console.log("success created taskkkk", task);
    return new Response(JSON.stringify("Success"), {
      status: 200,
    });
  } catch (err) {
    console.log(err, "eeeeerrrrr");
    return new Response(JSON.stringify("Failed Task"), {
      status: 401,
    });
  }
};
