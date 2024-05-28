import {
  Spinner,
  Step,
  Stepper as StepperComponent,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { IStepper } from "../@interfaces/Stepper/stepper";

const Stepper: React.FC<IStepper> = ({ steps, setIsModalOpen }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    isLastStep && setTimeout(() => setIsModalOpen(false), 3000);
  }, [activeStep, isLastStep, setActiveStep, setIsModalOpen]);

  useEffect(() => {
    const handleNext = () => {
      console.log("called next ");
      setLoading(false);
      setTimeout(() => setActiveStep((cur) => cur + 1), 3000);
    };

    const handleError = () => {
      setTimeout(() => setIsModalOpen(false), 3000);
    };

    const handleLoading = () => {
      console.log("called loading ");
      setLoading(true);
    };

    steps.forEach((step) => {
      window.addEventListener(step.initEvent, handleLoading);
      window.addEventListener(step.successEvent, handleNext);
      window.addEventListener(step.failEvent, handleError);
    });

    return () => {
      steps.forEach((step) => {
        window.removeEventListener(step.initEvent, handleLoading);
        window.removeEventListener(step.successEvent, handleNext);
        window.removeEventListener(step.failEvent, handleError);
      });
    };
  }, [isLastStep, setIsModalOpen, steps]);

  return (
    <div className="flex h-full w-full flex-col gap-4 items-center">
      <div className="w-full py-4 px-8">
        <StepperComponent
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          activeLineClassName="bg-green-500"
        >
          {steps.map((step, index) => (
            <Step
              key={step.title}
              className={`${"bg-gray-900"}`}
              completedClassName="bg-green-500"
              activeClassName={`${loading ? "bg-gray-900" : "bg-green-500"}`}
            >
              {loading && activeStep === index ? <Spinner /> : null}
            </Step>
          ))}
        </StepperComponent>
      </div>
      <div className="h-10 w-full flex items-center justify-center">
        {loading ? (
          <h2 className="text-black font-semibold text-lg font-serif">
            {steps[activeStep].loadingTitle}
          </h2>
        ) : (
          <h2 className="text-black font-semibold text-lg font-serif">
            {steps[activeStep].title}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Stepper;
