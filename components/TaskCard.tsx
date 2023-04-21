import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./Card";

import NewTask from "./NewTask";
import { store } from "@/store";
import SingleTask from "./SingleTask";
import { getProjectFromID } from "@/lib/helpers";

const tasks = Prisma.validator<Prisma.TaskArgs>()({});

type Tasks = Prisma.TaskGetPayload<typeof tasks>;

const getData = async () => {
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
const TaskCard = async ({
  title,
  tasks,
  projectId,
}: {
  title?: string;
  tasks: Tasks;
  projectId?: string;
}) => {
  const data = tasks || (await getData());

  const projects = store.getState().project.projects;

  return (
    <>
      <Card>
        <div
          className="flex justify-between items-center"
          style={{ minWidth: "50vw" }}
        >
          <div>
            <span className="text-3xl text-gray-600">{title}</span>
          </div>
          <div>
            <NewTask projects={projects} projectId={projectId} title={title} />
          </div>
        </div>
        <div>
          {data && data.length ? (
            <div>
              {data.map((task: Tasks, i) => (
                <SingleTask
                  key={i}
                  task={task}
                  projectName={getProjectFromID(task.projectId, projects)?.name}
                />
              ))}
            </div>
          ) : (
            <div>no tasks</div>
          )}
        </div>
      </Card>
    </>
  );
};

export default TaskCard;
