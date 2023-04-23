"use client";

import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { SortBy } from "@/store/settingsSlice";
import { sortByDateDescending, sortByDateAscending } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Projects({ projects }) {
  const settingsData = useAppSelector((state) => state.settings);

  const newSortedProjects =
    settingsData?.sortBy === SortBy.ASCENDING
      ? sortByDateAscending(projects)
      : sortByDateDescending(projects);

  const [sortedProjects, setSortedProjects] = useState(newSortedProjects);
  console.log(projects);

  useEffect(() => {
    const reSortedProjects =
      settingsData?.sortBy === SortBy.ASCENDING
        ? sortByDateAscending(projects)
        : sortByDateDescending(projects);
    setSortedProjects(reSortedProjects);
  }, [projects.length]);
  return (
    <>
      {sortedProjects.map((project, i) => {
        return (
          <div className="w1/3 p-3" key={i}>
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          </div>
        );
      })}
    </>
  );
}
