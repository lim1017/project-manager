import { serialize } from "cookie";

//logout route
export const POST = async () => {
  return new Response(JSON.stringify("Successful log out"), {
    status: 200,
    headers: {
      "Set-Cookie": serialize(process.env.COOKIE_NAME, "", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
};
