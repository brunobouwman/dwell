import { StepContent } from "./components/@interfaces/Stepper/stepper";

//TODO: Declare this in a better way
export const STEP_CONTENT = {
  MINTFIRST: "mintFirst",
  UPDATE: "update",
  CLAIM: "claim",
};

export const INTERNAL_EVENTS = {
  OPEN_MODAL: "openModal",
  CLOSE_MODAL: "closeModal",
  TRANSACTION_CONFIRMED: "transactionConfirmed",
  TRANSACTION_ERROR: "transactionError",
  DWELL_NFT_INIT: "dWellNFTInit",
  DWELL_NFT_MINTED: "dWellNFTMinted",
  DWELL_NFT_ERROR: "dWellNFTError",
  CHALLENGE_REQUIREMENTS_INIT: "challengeRequirementesInit",
  CHALLENGE_REQUIREMENTS_MET: "challengeRequirementesMet",
  CHALLENGE_REQUIREMENTS_ERROR: "challengeRequirementesError",
  CHALLENGE_NFT_INIT: "challengeNFTInit",
  CHALLENGE_NFT_MINTED: "challengeNFTMinted",
  CHALLENGE_NFT_ERROR: "challengeNFTError",
  HEALTH_DATA_INIT: "healthDataInit",
  HEALTH_DATA_RETRIEVED: "healthDataRetrieved",
  HEALTH_DATA_ERROR: "healthDataRetrieved",
  NEW_HEALTH_DATA_INIT: "newHealthDataInit",
  NEW_HEALTH_DATA_RETRIEVED: "newHealthDataRetrieved",
  NEW_HEALTH_DATA_ERROR: "newHealthDataError",
  COMPUTATION_INIT: "computationInit",
  COMPUTATION_RETRIEVED: "computationRetrieved",
  COMPUTATION_ERROR: "computationError",
  DATA_UPDATE_INIT: "dataUpdateInit",
  DATA_UPDATE_CONFIRMED: "dataUpdateConfirmed",
  DATA_UPDATE_ERROR: "dataUpdateError",
};

export const stepContent: StepContent[] = [
  {
    type: STEP_CONTENT.MINTFIRST,
    steps: [
      {
        title: " Confirm transaction",
        initEvent: "",
        successEvent: INTERNAL_EVENTS.TRANSACTION_CONFIRMED,
        failEvent: INTERNAL_EVENTS.CLOSE_MODAL,
      },
      {
        title: "dWell NFT minted!",
        loadingTitle: "Minting dWell NFT",
        initEvent: INTERNAL_EVENTS.DWELL_NFT_INIT,
        successEvent: INTERNAL_EVENTS.DWELL_NFT_MINTED,
        failEvent: INTERNAL_EVENTS.DWELL_NFT_ERROR,
      },
    ],
  },
  {
    type: STEP_CONTENT.UPDATE,
    steps: [
      {
        title: "Confirm transaction",
        initEvent: "",
        successEvent: INTERNAL_EVENTS.TRANSACTION_CONFIRMED,
        failEvent: INTERNAL_EVENTS.CLOSE_MODAL,
      },
      {
        title: "New data fetched",
        loadingTitle: "Fetching new data...",
        initEvent: INTERNAL_EVENTS.NEW_HEALTH_DATA_INIT,
        successEvent: INTERNAL_EVENTS.NEW_HEALTH_DATA_RETRIEVED,
        failEvent: INTERNAL_EVENTS.NEW_HEALTH_DATA_ERROR,
      },
      {
        title: "Encrypted data retrieved",
        loadingTitle: "Retrieving encrypted data...",
        initEvent: INTERNAL_EVENTS.HEALTH_DATA_INIT,
        successEvent: INTERNAL_EVENTS.HEALTH_DATA_RETRIEVED,
        failEvent: INTERNAL_EVENTS.HEALTH_DATA_ERROR,
      },
      {
        title: "Confirm transaction to decrypt data and append new",
        loadingTitle: "Decrypting data and updating...",
        initEvent: INTERNAL_EVENTS.COMPUTATION_INIT,
        successEvent: INTERNAL_EVENTS.COMPUTATION_RETRIEVED,
        failEvent: INTERNAL_EVENTS.COMPUTATION_ERROR,
      },
      {
        title: "Confirm transaction to save new data",
        loadingTitle: "Saving new data...",
        initEvent: INTERNAL_EVENTS.DATA_UPDATE_INIT,
        successEvent: INTERNAL_EVENTS.DATA_UPDATE_CONFIRMED,
        failEvent: INTERNAL_EVENTS.DATA_UPDATE_ERROR,
      },
    ],
  },
  {
    type: STEP_CONTENT.CLAIM,
    steps: [
      {
        title: " Confirm transaction",
        initEvent: "",
        successEvent: INTERNAL_EVENTS.TRANSACTION_CONFIRMED,
        failEvent: INTERNAL_EVENTS.CLOSE_MODAL,
      },
      {
        title: "Challenge requirmentes met!",
        loadingTitle: "Checking challenge requirement",
        initEvent: INTERNAL_EVENTS.CHALLENGE_REQUIREMENTS_INIT,
        successEvent: INTERNAL_EVENTS.CHALLENGE_REQUIREMENTS_MET,
        failEvent: INTERNAL_EVENTS.CHALLENGE_REQUIREMENTS_ERROR,
      },
      {
        title: "Challenge NFT minted!",
        loadingTitle: "Minting challenge NFT...",
        initEvent: INTERNAL_EVENTS.CHALLENGE_NFT_INIT,
        successEvent: INTERNAL_EVENTS.CHALLENGE_NFT_MINTED,
        failEvent: INTERNAL_EVENTS.CHALLENGE_NFT_ERROR,
      },
    ],
  },
];
