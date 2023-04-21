export const delay = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });

export const getProjectFromID = (id, projects) => {
  const project = projects.find((project) => project.id === id);
  return project;
};
