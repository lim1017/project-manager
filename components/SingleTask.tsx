"use client";
import { useState } from "react";
import Input from "./Input";
import { updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SingleTask({ task, projectName }) {
  const router = useRouter();

  const [checked, setChecked] = useState(
    task.status === "NOT_STARTED" ? false : true
  );

  const handleCompleteTask = async (e) => {
    setChecked(!checked);

    await updateTask({
      taskId: task.id,
      status: !checked ? "COMPLETED" : "NOT_STARTED",
    });

    router.refresh();
  };

  return (
    <div
      className="py-2 border-solid border-gray border-2 rounded-md p-3 mt-3"
      style={{ backgroundColor: checked ? "#8AFF8A" : "white" }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <Input
              type="checkbox"
              checked={checked}
              style={{ marginRight: "15px", width: "25px", height: "25px" }}
              onChange={handleCompleteTask}
            />
          </div>
          <div className="flex flex-col ml-3">
            <span className="text-gray-800">{task.name}</span>

            <span className="text-gray-400 text-sm">{task.description}</span>
          </div>
        </div>
        <div>
          <span className="text-gray-400 text-sm">{projectName}</span>
        </div>
      </div>
    </div>
  );
}
