"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/lib/hooks/useModal";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "react-modal";
import TextArea from "./TextArea";
import { createNewTask } from "@/lib/api";
import Select from "./Select";
import { ProjectType } from "@/types/types";
import { Spinner } from "./Spinner";

//TODO clientside reduxStore not working atm, so we're passing projects as props from store from serverComponent
export default function NewTask({
  projects,
  projectId,
  title,
}: {
  projects: ProjectType[];
  projectId?: string; //if projectID & title are passed in, we're creating a task from the project page
  title?: string;
}) {
  const router = useRouter();
  const { isOpen, openModal, closeModal, isLoading, setisLoading } = useModal();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState(
    projectId ? projectId : projects[0].id
  );

  const handleCreateTask = async (e) => {
    e.preventDefault();

    setisLoading(true);
    try {
      await createNewTask({
        name: task,
        description,
        projectId: selectedProject,
      });
      router.refresh();
      closeModal();
    } catch (err) {
      console.log(err);
    }

    setisLoading(false);
  };

  const projectOptions = projects.map((project) => {
    return {
      label: project.name,
      value: project.id,
    };
  });

  return (
    <div>
      <Button onClick={openModal} intent="text" className="text-violet-600">
        + Create Task
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={handleCreateTask}>
            {title ? (
              <h4 className="mb-4">Project: {title}</h4>
            ) : (
              <Select
                name="Projects"
                value={selectedProject}
                options={projectOptions}
                onChange={(e) => {
                  setSelectedProject(e.target.value);
                }}
                className="mb-4"
              />
            )}
            <Input
              placeholder="Task name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <TextArea
              className="mt-4 mb-4"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit">Create</Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
