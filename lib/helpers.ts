export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });

export const getProjectFromID = (id, projects) => {
  const project = projects.find((project) => project.id === id);
  return project;
};

export const sortByDateAscending = (arr) => {
  arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return arr;
};

export const sortByDateDescending = (arr) => {
  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return arr;
};
