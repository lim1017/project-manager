import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  console.log("in patchhhhing taskkkkkkk");
  const res = await req.json();
  console.log(res.status, "stattusussususkdjfhskdjfhkjh");
  try {
    await db.task.update({
      where: { id: res.taskId },
      data: {
        status: res.status, //change status of task
      },
    });
    console.log("success patching task");
    return NextResponse.json("created task");
  } catch (err) {
    console.log(err, "errrrrrrrrror patching task");
  }
};

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
        projectId: res.projectId,
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
