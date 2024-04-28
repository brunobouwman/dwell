import {
  Spinner,
  Step,
  Stepper as StepperComponent,
} from "@material-tailwind/react";
import React, { useCallback, useEffect } from "react";
import { IStepper } from "../@interfaces/Stepper/stepper";

const Stepper: React.FC<IStepper> = ({ steps, setIsModalOpen }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleNext = useCallback(() => {
    setLoading(false);
    !isLastStep && setTimeout(() => setActiveStep((cur) => cur + 1), 3000);
  }, [isLastStep]);

  const handleError = useCallback(() => {
    setTimeout(() => setIsModalOpen(false), 3000);
  }, [setIsModalOpen]);

  const handleLoading = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  useEffect(() => {
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
  }, [steps, handleNext, handleError, handleLoading]);

  return (
    <div className="flex flex-col gap-4 items-center">
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
              className={`${
                !activeStep && index < activeStep
                  ? "!bg-primary"
                  : "bg-gray-700"
              }`}
            >
              {loading && activeStep === index ? <Spinner /> : null}
            </Step>
          ))}
        </StepperComponent>
      </div>
      <div>
        {loading ? (
          <h2>{steps[activeStep].loadingTitle}</h2>
        ) : (
          <h2>{steps[activeStep].title}</h2>
        )}
      </div>
    </div>
  );
};

export default Stepper;
