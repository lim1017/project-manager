"use client";

import { createNewProject } from "@/lib/api";

export default function NewProjectBtn() {
  return (
    <div>
      <button
        onClick={() =>
          createNewProject(`tempProject${Math.floor(Math.random() * 100)}`)
        }
      >
        New Project
      </button>
    </div>
  );
}
