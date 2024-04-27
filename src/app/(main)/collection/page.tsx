import { IMAGE_6k } from "@/index";
import Image from "next/image";

const Collection: React.FC = async () => {
  return (
    <section className="w-full h-screen pt-40 bg-gray-900 text-white">
      <div className="flex flex-col h-screen w-full">
        <div className="flex flex-col items-center justify-center h-1/3 bg-gray-800 text-gray-300">
          {/* <Image
            alt="NFT Image"
            className="h-48 w-48 object-cover rounded-lg"
            src={PROFILE_IMAGE}
          /> */}
          <div className="mt-6 text-2xl font-bold">Overall Score: 900</div>
          <div className="mt-2 text-lg text-gray-400">Minted NFTs: 20</div>
        </div>
        <div className="flex flex-wrap justify-center items-start h-2/3 overflow-auto bg-gray-900 p-4">
          <div className="m-2">
            <div className="w-60 h-80 p-4 bg-gray-800 shadow-lg rounded-lg">
              <Image
                alt="NFT 1"
                className="h-48 w-48 object-cover rounded-lg"
                src={IMAGE_6k}
              />
              <div className="mt-2 text-lg font-bold">NFT 1</div>
              <div className="mt-auto"></div>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-60 h-80 p-4 bg-gray-800 shadow-lg rounded-lg">
              <Image
                alt="NFT 2"
                className="h-48 w-48 object-cover rounded-lg"
                src={IMAGE_6k}
              />
              <div className="mt-2 text-lg font-bold">NFT 3</div>
              <div className="mt-auto"></div>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-60 h-80 p-4 bg-gray-800 shadow-lg rounded-lg">
              <Image
                alt="NFT 2"
                className="h-48 w-48 object-cover rounded-lg"
                src={IMAGE_6k}
              />
              <div className="mt-2 text-lg font-bold">NFT 3</div>
              <div className="mt-auto"></div>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-60 h-80 p-4 bg-gray-800 shadow-lg rounded-lg">
              <Image
                alt="NFT 2"
                className="h-48 w-48 object-cover rounded-lg"
                src={IMAGE_6k}
              />
              <div className="mt-2 text-lg font-bold">NFT 3</div>
              <div className="mt-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
