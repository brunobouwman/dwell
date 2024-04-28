"use client";

import { stepContent } from "@/constants";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Step, StepEvent } from "../@interfaces/Stepper/stepper";
import Stepper from "../Stepper/Stepper";

Modal.setAppElement("#__next");

function StepperModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<Step[]>([]);

  const openModal = (e: Event) => {
    const customEvent = e as CustomEvent<StepEvent>;

    const content = stepContent.find(
      (content) => content.type === customEvent.detail.type
    );

    content && setActiveContent(content.steps);

    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {}, []);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    window.addEventListener("openModal", (e) => openModal(e));

    return () => {
      window.removeEventListener("openModal", (e) => openModal(e));
    };
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Stepper Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "40%", // Adjust based on your layout
          height: "20%", // Adjust based on your layout
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)", // Dim the background
        },
      }}
    >
      <Stepper steps={activeContent} setIsModalOpen={setModalIsOpen} />
    </Modal>
  );
}

export default StepperModal;
