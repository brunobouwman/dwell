export interface Step {
  title: string;
  initEvent: string;
  successEvent: string;
  failEvent: string;
  loadingTitle?: string;
}

export interface StepContent {
  type: string;
  steps: Step[];
}

export interface StepEvent {
  type: string;
}

export interface IStepper {
  steps: Step[];
  setIsModalOpen: (state: boolean) => void;
}
