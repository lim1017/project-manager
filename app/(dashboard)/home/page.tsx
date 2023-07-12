import GreetingsSkeleton from "@/components/GreetingSkeleton";
import Greetings from "@/components/Greetings";
import NewProject from "@/components/NewProject";
import Projects from "@/components/Projects";
import TaskCardContainer from "@/components/TaskCardContainer";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import Providers from "@/lib/providers/Provider";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const getProjects = async () => {
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return projects.filter((project) => {
    return project.deleted === false;
  });
};

export default async function Page() {
  const projects = await getProjects();

  //saving projects to store in server side component
  // store.dispatch(setProjects(projects));

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          <Providers>
            <Projects
              //work around for can not pass date objs to client
              projects={JSON.parse(JSON.stringify(projects))}
              data-superjson
            />
          </Providers>
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          {projects.length ? (
            <div className="w-full">
              <TaskCardContainer />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
