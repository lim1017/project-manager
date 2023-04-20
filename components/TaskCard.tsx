import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./Card";

import NewTask from "./NewTask";

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
const TaskCard = async ({ title, tasks }: { title: string; tasks: Tasks }) => {
  const data = tasks || (await getData());

  return (
    <>
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl text-gray-600">{title}</span>
          </div>
          <div>
            <NewTask />
          </div>
        </div>
        <div>
          {data && data.length ? (
            <div>
              {data.map((task) => (
                <div className="py-2 ">
                  <div>
                    <span className="text-gray-800">{task.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">
                      {task.description}
                    </span>
                  </div>
                </div>
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
