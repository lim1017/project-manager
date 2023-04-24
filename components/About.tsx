"use client";
import { useModal } from "@/lib/hooks/useModal";
import Modal from "react-modal";
import Button from "./Button";
import { useState } from "react";

export const About = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const [error, setError] = useState(false);

  if (error)
    throw new Error("Intentional Error thrown from Greeting component");

  return (
    <>
      <Button size="small" className="mt-3" onClick={openModal}>
        About Project
      </Button>

      <Button
        size="small"
        className="mt-3 ml-4"
        intent="error"
        onClick={() => setError(true)}
      >
        Throw Error
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">About</h1>
        <p className="text-lg mb-6">
          This is a simple CRUD app built with NextJs (beta) App Router, and
          TailwindCSS,{" "}
        </p>

        <p className="font-bold">New concepts:</p>
        <ul>
          <li>Server components</li>
          <li>Error boundaries/Suspense</li>
          <li>async/await components for data fetching</li>
          <li>Prisma</li>
          <li>middleware</li>
        </ul>
      </Modal>
    </>
  );
};
