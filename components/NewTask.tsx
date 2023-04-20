"use client";
import { useModal } from "@/lib/hooks/useModal";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "react-modal";

export default function NewTask() {
  const { isOpen, openModal, closeModal } = useModal();

  const [name, setName] = useState("");

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
        <h1 className="text-3xl mb-6">New Project</h1>
        <form
          className="flex items-center"
          onSubmit={() => console.log("submit")}
        >
          <Input
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
}
