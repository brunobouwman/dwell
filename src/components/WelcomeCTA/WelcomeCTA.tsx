"use client";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const WelcomeCTA: React.FC = () => {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const { address } = useWeb3ModalAccount();
  const router = useRouter();

  useEffect(() => {
    address && router.push("/dashboard");
  }, [address, router]);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <>
      {!address && (
        <>
          <div
            className="absolute w-full h-fit top-0 left-0 right-0 bottom-0 z-10 bg-gray-900 bg-opacity-75 pointer-events-none"
            style={{
              opacity:
                isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
            }}
          />
          <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg text-gray-700">
            <h1 className="text-2xl font-bold text-center text-primary mb-4">
              Welcome to dWell!
            </h1>
            <p className="text-md mb-4">
              Step into a new era of health and fitness with dWell, where your
              daily activities are not just healthy habits but pathways to
              rewarding challenges. Transform your approach to wellness with the
              latest in decentralized applications technology.
            </p>
            <h2 className="text-xl font-semibold text-primary mb-2">
              How dWell Works:
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Connect Your Wallet: Begin your journey by connecting your
                wallet to start interacting with the protocol.
              </li>
              <li>
                Encrypt & Protect: We encrypt your health data and ensure secure
                data transmission with the power of oracle technology, storing
                it safely as an NFT on the blockchain.
              </li>
              <li>
                Authenticate Your Device: Authenticate with Google to use data
                from your smartwatch, integrating seamlessly into our platform.
              </li>
              <li>
                Engage in Challenges: Take on fun and motivating challenges
                using your actual health data like steps, calories, sleep, and
                many more. Achieve your goals and earn exclusive rewards in the
                form of NFTs.
              </li>
            </ol>
            <p className="italic text-md">
              Our Mission: To gamify healthy habits, making wellness both fun
              and rewarding. At dWell, we’re not just about tracking fitness;
              we’re about enriching your health journey and celebrating your
              achievements with tangible rewards.
            </p>
            <div
              onClick={closeAll}
              className="w-full h-fit pt-4 flex items-center justify-center"
            >
              <w3m-button />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WelcomeCTA;
