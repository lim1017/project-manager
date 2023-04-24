"use client";

import { deleteProject } from "@/lib/api";
import Button from "./Button";
import { Trash } from "react-feather";
import { useModal } from "@/lib/hooks/useModal";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { Spinner } from "./Spinner";

export const DeleteProject = ({ projectId }) => {
  const { isOpen, openModal, closeModal, isLoading, setisLoading } = useModal();
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();

    setisLoading(true);
    await deleteProject(projectId);
    router.refresh();
    setisLoading(false);

    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">Are you sure you want to delete?</h1>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Button onClick={closeModal}>Cancel</Button>
            <Button className="ml-2" onClick={handleDelete}>
              Yes
            </Button>
          </>
        )}
      </Modal>
      <Button
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
        size="small"
      >
        <Trash size={20} />
      </Button>
    </>
  );
};
