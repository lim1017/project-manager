import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./Card";

import NewTask from "./NewTask";
import SingleTask from "./SingleTask";
import { getProjectFromID } from "@/lib/helpers";
import { getProjects } from "@/app/(dashboard)/home/page";

const tasks = Prisma.validator<Prisma.TaskArgs>()({});

export type Tasks = Prisma.TaskGetPayload<typeof tasks>;

export const getTasks = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};

//card will be reused in scenarios where tasks get passed in
const TaskCardContainer = async () => {
  const tasks = await getTasks();

  const projects = await getProjects();

  return (
    <>
      <Card>
        <div
          className="flex justify-end items-center"
          style={{ minWidth: "50vw" }}
        >
          <div>
            <NewTask projects={JSON.parse(JSON.stringify(projects))} />
          </div>
        </div>
        <div>
          {tasks && tasks.length ? (
            <div>
              {tasks.map((task: Tasks, i) => (
                <SingleTask
                  key={i}
                  task={task}
                  projectName={getProjectFromID(task.projectId, projects)?.name}
                />
              ))}
            </div>
          ) : (
            <div>No Tasks</div>
          )}
        </div>
      </Card>
    </>
  );
};

export default TaskCardContainer;
