"use client";

import { abi, address as nftContractAddress } from "@/contracts/NFT";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3, { Contract } from "web3";

interface IDataProvider {
  children: ReactNode;
}

interface userReading {
  email: string;
  steps: string;
}

interface ProviderMethods {
  setNFTContract: (contract: any) => void;
  getNFTContract: () => any;
  setIsFirstAccess: (state: boolean) => void;
  getIsFirstAccess: () => boolean;
  setLastReading: (reading: userReading) => void;
  getLastReading: () => userReading | null;
  setGrantAccess: (state: boolean) => void;
  getGrantAccess: () => boolean;
}

const DataContext = createContext({} as ProviderMethods);

const DataProvider: React.FC<IDataProvider> = ({ children }) => {
  const [nftContract, setNFTContract] = useState<Contract<typeof abi> | null>(
    null
  );
  const [isFirstAccess, setIsFirstAccess] = useState(false);
  const [lastReading, setLastReading] = useState<userReading | null>(null);
  const [grantAccess, setGrantAccess] = useState(false);

  useEffect(() => {
    if (!window) return;

    const web3 = new Web3(window.ethereum);

    const nftContract = new web3.eth.Contract(abi, nftContractAddress);

    nftContract && setNFTContract(nftContract);
  }, []);

  const getNFTContract = () => nftContract;

  const getIsFirstAccess = () => isFirstAccess;

  const getLastReading = () => lastReading;

  const getGrantAccess = () => grantAccess;

  const values: ProviderMethods = {
    setNFTContract,
    getNFTContract,
    setIsFirstAccess,
    getIsFirstAccess,
    setLastReading,
    getLastReading,
    getGrantAccess,
    setGrantAccess,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

const useDataProvider = () => useContext(DataContext);

export { DataProvider, useDataProvider };
