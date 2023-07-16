import { FC } from "react";
import Card from "./Card";
import clsx from "clsx";
import { ProjectWithTasks } from "@/lib/types";
import { DeleteProject } from "./DeleteProject";
import Link from "next/link";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);
  // const completedCount = 0;
  // const progress = 0;

  return (
    <Card className="!px-6 !py-8">
      <Link href={`/project/${project.id}`}>
        <div className="hover:scale-105 transition-all ease-in-out duration-200">
          <div>
            <span className="text-sm text-gray-300">
              {formatDate(project.createdAt)}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl text-gray-600">{project.name}</span>
          </div>
        </div>
      </Link>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
          {/* 0/0 completed */}
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full"
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
          <DeleteProject projectId={project.id} />
          <span className="text-sm text-gray-600 font-semibold">
            {isNaN(progress) ? 0 : progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
