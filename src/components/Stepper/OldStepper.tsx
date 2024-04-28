"use client";

import {
  Spinner,
  Step,
  Stepper as StepperComponent,
  Typography,
} from "@material-tailwind/react";
import React, { useCallback, useEffect } from "react";
import { IStepper } from "../@interfaces/Stepper/stepper";

const OldStepper: React.FC<IStepper> = ({ setIsModalOpen }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [minted, setMinted] = React.useState(false);

  const handleNext = useCallback(() => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  }, [isLastStep]);

  const handleMinted = useCallback(() => {
    setMinted(true);

    setTimeout(() => setIsModalOpen(false), 3000);
  }, [setMinted, setIsModalOpen]);

  const handleError = useCallback(() => {
    setTimeout(() => setIsModalOpen(false), 3000);
  }, [setIsModalOpen]);

  useEffect(() => {
    window.addEventListener("dWellNFTMinted", handleMinted);

    return () => {
      window.removeEventListener("dWellNFTMinted", handleMinted);
    };
  }, [handleMinted]);

  useEffect(() => {
    window.addEventListener("transactionConfirmed", handleNext);

    return () => {
      window.removeEventListener("transactionConfirmed", handleNext);
    };
  }, [handleNext]);

  useEffect(() => {
    window.addEventListener("transactionError", handleError);

    return () => {
      window.removeEventListener("transactionConfirmed", handleError);
    };
  }, [handleError]);

  return (
    <div className="w-full px-24 py-4">
      <StepperComponent
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        activeLineClassName="bg-green-500"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Step
          className={`${!isFirstStep ? "!bg-primary" : "bg-gray-700"}`}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {isFirstStep ? (
            <Spinner
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          ) : null}
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              className={`${!isFirstStep ? "text-primary" : "text-gray-700"}`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Confirm transaction
            </Typography>
          </div>
        </Step>
        <Step
          className={`${activeStep && minted ? " !bg-primary" : "bg-gray-700"}`}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {activeStep && !minted ? (
            <Spinner
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          ) : null}
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              className={`${
                activeStep && minted ? " !text-primary" : "text-gray-700"
              }`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              dWell NFT Minted
            </Typography>
          </div>
        </Step>
      </StepperComponent>
    </div>
  );
};

export default OldStepper;
