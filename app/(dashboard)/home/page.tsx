import GreetingsSkeleton from "@/components/GreetingSkeleton";
import Greetings from "@/components/Greetings";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { store } from "@/store";
import { setProjects } from "@/store/projectSlice";
import { setStartupPokemon } from "@/store/searchSlice";
// import { setProjects } from "@/store/projectSlice";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getProjects = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

export default async function Page() {
  const { projects } = await getProjects();

  //saving projects to store in server side component
  store.dispatch(setProjects(projects));


  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {projects.map((project, i) => {
            return (
              <div className="w1/3 p-3" key={i}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
            );
          })}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
