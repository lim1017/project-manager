"use client";
import { useModal } from "@/lib/hooks/useModal";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "react-modal";
import TextArea from "./TextArea";
import { createNewTask } from "@/lib/api";

export default function NewTask() {
  const { isOpen, openModal, closeModal } = useModal();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();

    await createNewTask({ name: task, description });
    closeModal();
  };

  return (
    <div>
      <Button onClick={openModal} intent="text" className="text-violet-600">
        + Create New
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>
        <form onSubmit={handleCreateTask}>
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
      </Modal>
    </div>
  );
}
