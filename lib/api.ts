export const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    //handle error
    throw new Error(res.statusText);
  }

  if (json) {
    const data = await res.json();

    return data.data;
  }
};

export const register = async (user) => {
  const res = await fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });

  return res;
};

export const signin = async (user) => {
  const res = await fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });

  return res;
};
