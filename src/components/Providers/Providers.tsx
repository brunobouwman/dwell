"use client";

import { DataProvider } from "@/app/context/dataProvider";
import { Web3Modal } from "@/app/context/web3modal";
import { SessionProvider } from "next-auth/react";

import type { FC, ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Web3Modal>
        <DataProvider>
          <SkeletonTheme highlightColor="#4c5d7910">{children}</SkeletonTheme>
        </DataProvider>
      </Web3Modal>
    </SessionProvider>
  );
};

export default Providers;
