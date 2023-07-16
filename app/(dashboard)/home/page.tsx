import GreetingsSkeleton from "@/components/GreetingSkeleton";
import Greetings from "@/components/Greetings";
import NewProject from "@/components/NewProject";
import Projects from "@/components/Projects";
import TaskCardContainer from "@/components/TaskCardContainer";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import Providers from "@/lib/providers/Provider";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const revalidate = 0;
export const fetchCache = "force-no-store";

export const getProjects = async () => {
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
      deleted: false,
    },
    include: {
      tasks: true,
    },
  });

  // const queryString = `Select p.*, t.*
  // From "Project" AS p
  // LEFT JOIN(
  //   SELECT * FROM "Task"
  // )  AS t ON p.id = t."projectId"
  // Where p."ownerId" = '${user?.id}' and p."deleted" = false;`;

  // console.log(queryString);

  // const projects = await db.$queryRawUnsafe(queryString);

  return projects;
};

export default async function Page() {
  const projects = await getProjects();
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
