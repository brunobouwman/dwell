"use client";

import { useDataProvider } from "@/app/context/dataProvider";
import { STEP_CONTENT } from "@/constants";
import { IMAGE_5k } from "@/index";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { signIn, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  //TODO: Maybe gather eventListeners in a single component
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

  // const testUpdateFlow = () => {
  // const confirmEvent = new Event(INTERNAL_EVENTS.TRANSACTION_CONFIRMED);
  // const dataRetrieveInitEvent = new Event(
  //   INTERNAL_EVENTS.NEW_HEALTH_DATA_INIT
  // );
  // const dataRetrievedEvent = new Event(
  //   INTERNAL_EVENTS.NEW_HEALTH_DATA_RETRIEVED
  // );
  // const healthDataInitEvent = new Event(INTERNAL_EVENTS.HEALTH_DATA_INIT);
  // const healthDataRetrievedEvent = new Event(
  //   INTERNAL_EVENTS.HEALTH_DATA_RETRIEVED
  // );
  // const updateDataInit = new Event(INTERNAL_EVENTS.DATA_UPDATE_INIT);
  // const updateDataConfirm = new Event(INTERNAL_EVENTS.DATA_UPDATE_CONFIRMED);
  // setTimeout(() => window.dispatchEvent(confirmEvent), 3000);
  // setTimeout(() => window.dispatchEvent(dataRetrieveInitEvent), 4000);
  // setTimeout(() => window.dispatchEvent(dataRetrievedEvent), 7000);
  // setTimeout(() => window.dispatchEvent(healthDataInitEvent), 8000);
  // setTimeout(() => window.dispatchEvent(healthDataRetrievedEvent), 11000);
  // setTimeout(() => window.dispatchEvent(updateDataInit), 12000);
  // setTimeout(() => window.dispatchEvent(updateDataConfirm), 15000);

  // const confirmedEvent = new Event(INTERNAL_EVENTS.TRANSACTION_CONFIRMED);
  // setTimeout(() => window.dispatchEvent(confirmedEvent), 3000);

  // const nftInit = new Event(INTERNAL_EVENTS.DWELL_NFT_INIT);
  // setTimeout(() => window.dispatchEvent(nftInit), 6000);

  // const nftMinted = new Event(INTERNAL_EVENTS.DWELL_NFT_MINTED);
  // setTimeout(() => window.dispatchEvent(nftMinted), 9000);

  // const confirmedEvent = new Event(INTERNAL_EVENTS.TRANSACTION_CONFIRMED);
  // setTimeout(() => window.dispatchEvent(confirmedEvent), 3000);

  // const challengeInit = new Event(
  //   INTERNAL_EVENTS.CHALLENGE_REQUIREMENTS_INIT
  // );
  // setTimeout(() => window.dispatchEvent(challengeInit), 4500);

  // const challengeComplete = new Event(
  //   INTERNAL_EVENTS.CHALLENGE_REQUIREMENTS_MET
  // );
  // setTimeout(() => window.dispatchEvent(challengeComplete), 7500);

  // const nftInit = new Event(INTERNAL_EVENTS.CHALLENGE_NFT_INIT);
  // setTimeout(() => window.dispatchEvent(nftInit), 9000);

  // const nftComplete = new Event(INTERNAL_EVENTS.CHALLENGE_NFT_MINTED);
  // setTimeout(() => window.dispatchEvent(nftComplete), 12000);
  // };

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

  const updateHealthData = async () => {
    const modalEvent = new Event("openModal");
    window.dispatchEvent(modalEvent);

    //TODO: Call the contract and deal with events
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
      {isFirstAccess && (
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
      )}
      {!isFirstAccess && !session ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-6">
          <h2 className="text-2xl font-bold font-serif">
            Ready to show your work? Sign in with Google first.
          </h2>
          <GoogleButton
            onClick={async () =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/dashboard",
              })
            }
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 gap-6">
          <h2 className="text-2xl font-bold font-serif">Update your data!</h2>
          <button
            className="bg-green-600 text-white rounded-md py-2 px-4 mt-4"
            onClick={updateHealthData}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
