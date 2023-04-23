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
    console.log("in res not ok");
    const error = await res.json();
    console.log(error);
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

export const signOut = async () => {
  const data = await fetcher({
    url: "/api/signout",
    method: "post",
    body: {},
  });

  return data;
};

export const createNewProject = async (name) => {
  const data = fetcher({
    url: "/api/project",
    method: "post",
    body: { name },
  });

  return data;
};

export const createNewTask = async (task) => {
  const data = fetcher({
    url: "/api/task",
    method: "post",
    body: task,
  });

  return data;
};

export const updateTask = async (task) => {
  const data = fetcher({
    url: "/api/task",
    method: "PATCH",
    body: task,
  });

  return data;
};
