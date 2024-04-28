"use client";

import { DataProvider } from "@/app/context/dataProvider";
import { Web3Modal } from "@/app/context/web3modal";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@material-tailwind/react";
import type { FC, ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import StepperModal from "../StepperModal/StepperModal";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Web3Modal>
        <DataProvider>
          <ThemeProvider>
            <StepperModal />
            <SkeletonTheme highlightColor="#4c5d7910">{children}</SkeletonTheme>
          </ThemeProvider>
        </DataProvider>
      </Web3Modal>
    </SessionProvider>
  );
};

export default Providers;
