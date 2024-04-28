"use client";

import { useDataProvider } from "@/app/context/dataProvider";
import { STEP_CONTENT } from "@/constants";
import { IMAGE_5k } from "@/index";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleButton from "react-google-button";
import { StepEvent } from "../@interfaces/Stepper/stepper";

const DashBoard: React.FC = () => {
  const { address } = useWeb3ModalAccount();
  const { getNFTContract, setIsFirstAccess, getIsFirstAccess } =
    useDataProvider();
  const nftContract = getNFTContract();
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
    if (!nftContract) return;

    nftContract.events
      .IdentityNFTMinted({
        filter: {}, // You can use filters to narrow down events. Leave empty for all.
        fromBlock: 0, // You might want to specify a specific block to start listening from
      })
      .on("data", function (event: any) {
        const mintedEvent = new Event("dWellNFTMinted");
        window.dispatchEvent(mintedEvent);
        setIsFirstAccess(false);
      });

    nftContract.events
      .IdentityNFTMinted({
        filter: {}, // You can use filters to narrow down events. Leave empty for all.
        fromBlock: 0, // You might want to specify a specific block to start listening from
      })
      .on("error", console.error);
  }, [nftContract, setIsFirstAccess]);

  const mintFirstNFT = async () => {
    if (!nftContract) return;

    const modalEvent = new CustomEvent<StepEvent>("openModal", {
      detail: { type: STEP_CONTENT.MINTFIRST },
    });
    window.dispatchEvent(modalEvent);

    try {
      await nftContract.methods
        .mintIdentityToken(address)
        .send({ from: address })
        .on("transactionHash", () => {
          const confirmedEvent = new Event("transactionConfirmed");
          window.dispatchEvent(confirmedEvent);
        })
        .on("error", () => {
          const errorEvent = new Event("transactionError");
          window.dispatchEvent(errorEvent);
        });
    } catch (e) {
      const errorEvent = new Event("transactionError");
      window.dispatchEvent(errorEvent);
    }
  };

  return (
    <div className="mx-auto px-6 py-8">
      <div className="flex justify-around items-start">
        <div className="flex flex-col items-center justify-center gap-8">
          <h2>Today&#39;s Challenge</h2>
          <Image
            alt="Daily Goal NFT"
            className="rounded-lg h-48 w-48"
            src={IMAGE_5k}
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
      {isFirstAccess ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-6">
          <h2 className="text-2xl font-bold">
            Mint your first NFT to start interacting with our protocol!
          </h2>
          <button
            className="bg-green-600 text-white rounded-md py-2 px-4 mt-4"
            onClick={mintFirstNFT}
          >
            Mint dWell NFT
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 gap-6">
          <h2 className="text-2xl font-bold">
            Ready to show today&#39;s work?
          </h2>
          <GoogleButton
            // onClick={async () =>
            //   signIn("google", {
            //     redirect: true,
            //     callbackUrl: "/dashboard",
            //   })
            // }
            onClick={mintFirstNFT}
          />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
