import Card from "./Card";
import NewTask from "./NewTask";
import SingleTask from "./SingleTask";
import { getProjectFromID } from "@/lib/helpers";
import { getProjects } from "@/app/(dashboard)/home/page";
import { Tasks, getTasks } from "./TaskCardContainer";

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
  const data = tasks || (await getTasks());

  // const projects = store.getState().project.projects;
  const projects = await getProjects();

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
            <NewTask
              projects={projects}
              projectId={projectId}
              title={title}
              data-superjson
            />
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
