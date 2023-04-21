import { Prisma } from "@prisma/client";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  //items with relations are not auto included
  include: { tasks: true },
});

// This is a type that represents the shape of the data that we get from the
// database. It's a combination of the Project model and the Task model.
export type ProjectWithTasks = Prisma.ProjectGetPayload<
  typeof projectWithTasks
>;

const project = Prisma.validator<Prisma.ProjectArgs>()({});

export type ProjectType = Prisma.ProjectGetPayload<typeof project>;
