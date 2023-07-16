"use client";
import Card from "./Card";
import NewTask from "./NewTask";
import SingleTask from "./SingleTask";
import { Tasks } from "./TaskCardContainer";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "react-feather";

//card will be reused in scenarios where tasks get passed in
const ProjectCardDetails = ({
  title,
  tasks,
  projectId,
}: {
  title?: string;
  tasks: Tasks[];
  projectId?: string;
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Card>
        <div
          className="flex justify-between items-center"
          style={{ minWidth: "50vw" }}
        >
          <div className="flex justify-between items-center">
            <ArrowLeftCircle
              className="hover:cursor-pointer"
              size={25}
              onClick={handleBack}
            />
            <span className="ml-2 text-3xl text-gray-600">{title}</span>
          </div>
          <div>
            <NewTask projects={[]} projectId={projectId} title={title} />
          </div>
        </div>
        <div>
          {tasks && tasks.length ? (
            <div>
              {tasks.map((task: Tasks, i) => (
                <SingleTask key={i} task={task} projectName={title} />
              ))}
            </div>
          ) : (
            <div>No tasks</div>
          )}
        </div>
      </Card>
    </>
  );
};

export default ProjectCardDetails;
