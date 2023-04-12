export const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  console.log(res, "resssssssss");

  if (!res.ok) {
    const error = await res.text();
    throw error || "Something went wrong!";
  }

  if (json) {
    const data = await res.json();

    console.log(data, "data");
    return data.data;
  }
};

export const register = (user) => {
  console.log("in register api.ts");
  return fetcher({
    url: "http://localhost:3000/api/register",
    method: "post",
    body: user,
  });
};

export const signin = async (user) => {
  const data = await fetcher({
    url: "/api/signin",
    method: "post",
    body: user,
  });

  return data;
};
