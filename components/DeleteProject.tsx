"use client";

import { deleteProject } from "@/lib/api";
import Button from "./Button";
import { Trash } from "react-feather";

export const DeleteProject = ({ projectId }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(projectId, "delete");
    deleteProject(projectId);
  };

  return (
    <Button onClick={handleDelete} size="small">
      <Trash size={20} />
    </Button>
  );
};
