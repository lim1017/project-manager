"use client";

import { useRouter } from "next/navigation";
import { createNewProject } from "@/lib/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { useModal } from "@/lib/hooks/useModal";
import { Spinner } from "./Spinner";

Modal.setAppElement("#modal");

const NewProject = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { isOpen, openModal, closeModal, isLoading, setisLoading } = useModal();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setisLoading(true);
    try {
      await createNewProject(name);
      router.refresh();
      closeModal();
    } catch (err) {
      setError("Name already exists");
      console.log(err, "error creating project");
    }
    setisLoading(false);
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button
        onClick={() => {
          setName("");
          setError("");
          openModal();
        }}
      >
        + New Project
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <Input
                placeholder="project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="ml-3" type="submit">
                Create
              </Button>
            </form>
            <div className="flex justify-center">
              <p className="mt-3" style={{ color: "red" }}>
                {error}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NewProject;
