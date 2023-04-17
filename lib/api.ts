export const fetcher = async ({ url, method, body }) => {
  const res = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res, "resssssssss");

  if (!res.ok) {
    const error = await res.json();
    throw error || "Something went wrong!";
  }
  const data = await res.json();
  return data.data;
};

export const register = async (user) => {
  const data = await fetcher({
    url: "http://localhost:3000/api/register",
    method: "post",
    body: user,
  });

  return data;
};

export const signin = async (user) => {
  const data = await fetcher({
    url: "/api/signin",
    method: "post",
    body: user,
  });

  return data;
};

export const createNewProject = (name) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
};
