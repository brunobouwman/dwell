"use client";

import { useDataProvider } from "@/app/context/dataProvider";
import DashBoardCTA from "@/components/DashboardCTA/DashboardCTA";
import { IMAGE_5k } from "@/index";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const {
    getIsFirstAccess,
    setIsFirstAccess,
    setLastReading,
    getLastReading,
    getGrantAccess,
    setGrantAccess,
    getNFTContract,
  } = useDataProvider();
  const nftContract = getNFTContract();
  const { address } = useWeb3ModalAccount();
  const [welcomeLoading, setWelcomeLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [mintLoading, setMintLoading] = useState(false);
  const [mintMessage, setMintMessage] = useState("");
  const lastReading = getLastReading();
  const router = useRouter();
  const isFirstAccess = getIsFirstAccess();

  useEffect(() => {
    if (!address) {
      router.push("/");
      return;
    }
  }, [router, address]);

  useEffect(() => {
    if (!nftContract || !address) return;

    (async () => {
      const hasNFT = await nftContract.methods.hasIdentityToken(address).call();

      setIsFirstAccess(!hasNFT);
    })();
  }, [nftContract, address, setIsFirstAccess]);

  useEffect(() => {
    if (!session) return;

    console.log("session", session);
  }, [session]);

  return (
    <section className="w-full h-full bg-gray-900 text-white">
      <div className="mx-auto px-6 py-8">
        <div className="flex justify-around items-start">
          <div className="flex flex-col items-center justify-center gap-8">
            <h2>Today&#39;s Challenge</h2>
            <Image
              alt="Daily Goal NFT"
              className="rounded-lg h-48 w-48"
              src={IMAGE_5k}
              // onClick={async () => {
              //   const res = await fetch(
              //     `/api/historical?refreshToken=${
              //       (session as any).refreshToken
              //     }`
              //   );

              //   if (res) {
              //     const { data: parsedData } = await res.json();
              //     console.log("data", parsedData);
              //   }
              // }}
            />
            <div className="bg-green-600 text-white rounded-md py-2 px-4 mt-4">
              Try and claim it
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-8">
            <h2>Last Accomplishment</h2>
            <Image
              alt="Last Accomplishment NFT"
              className="rounded-lg h-48 w-48"
              src={IMAGE_5k}
            />
          </div>
        </div>
        <DashBoardCTA isFirstAccess={isFirstAccess} />
      </div>
      <footer className="fixed bottom-4 right-4 text-gray-400">
        {/* <div className="flex items-center gap-4">
          <h3>All data protected by </h3>
          <Image src={IMAGE_IEXEC} height={44} width={120} alt="iExec" />
        </div> */}
      </footer>
    </section>
  );
};

export default Dashboard;
