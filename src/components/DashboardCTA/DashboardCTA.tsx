"use client";

import { useDataProvider } from "@/app/context/dataProvider";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import GoogleButton from "react-google-button";

interface IDashboardCTA {
  isFirstAccess: boolean;
}

const DashBoardCTA: React.FC<IDashboardCTA> = ({ isFirstAccess }) => {
  const { address } = useWeb3ModalAccount();
  const { getNFTContract, setIsFirstAccess } = useDataProvider();
  const nftContract = getNFTContract();

  useEffect(() => {
    if (!nftContract) return;

    nftContract.events
      .IdentityNFTMinted({
        filter: {}, // You can use filters to narrow down events. Leave empty for all.
        fromBlock: 0, // You might want to specify a specific block to start listening from
      })
      .on("data", function (event: any) {
        console.log("DATA minted: ", event);
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
    console.log("here", address);

    await nftContract.methods
      .mintIdentityToken(address)
      .send({ from: address });
  };

  return (
    <>
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
            onClick={async () =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/dashboard",
              })
            }
          />
        </div>
      )}
    </>
  );
};

export default DashBoardCTA;
