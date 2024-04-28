"use client";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const router = useRouter();
  const { address } = useWeb3ModalAccount();

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <>
      <div
        className="absolute w-full h-fit top-0 left-0 right-0 bottom-0 z-10 bg-gray-900 bg-opacity-75 pointer-events-none"
        style={{
          opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
        }}
      />
      <div className="flex justify-between items-center p-4 pb-7 h-20 w-full fixed bg-gray-900">
        <div className="flex items-center gap-32 h-full w-48 cursor-pointer">
          <h1 className="text-primary font-serif font-semibold text-lg" onClick={() => router.push("/")}>
            dWell
          </h1>
          <h1
            className="`text-white w-fit whitespace-nowrap font-serif font-semibold text-lg"
            onClick={() => router.push("/collection")}
          >
            My Collection
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <w3m-network-button />
          </div>
          {address && (
            <div
              onClick={closeAll}
              style={{
                opacity:
                  isConnectHighlighted || isNetworkSwitchHighlighted ? 0 : 1,
              }}
            >
              <w3m-button />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
