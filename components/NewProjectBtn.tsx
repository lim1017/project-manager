"use client";

import { createNewProject } from "@/lib/api";

export default function NewProjectBtn() {
  return (
    <div>
      <button onClick={() => createNewProject("tempProject")}>
        New Project
      </button>
    </div>
  );
}
