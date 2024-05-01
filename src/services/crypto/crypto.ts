import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from "crypto";
import {
  AppendNewDataRequest,
  AppendNewDataResponse,
  CryptographyService,
  DecryptedData,
  EncryptedData,
  VerifyChallengeRequest,
  VerifyChallengeResponse,
} from "../@interfaces/cryptography";

export class CryptoService implements CryptographyService {
  constructor() {}

  // Derive a cryptographic key using the wallet address and a predefined salt
  private _deriveKeyFromAddress(walletAddress: string) {
    const salt = process.env.NEXT_PUBLIC_SALT; // Retrieve the secure salt from environment variables

    //TODO: Improve error handling
    if (!salt) {
      return "Salt not found";
    }
    return pbkdf2Sync(walletAddress, salt, 1000, 32, "sha512");
  }

  // Encrypt data using the derived key
  _encrypt = (walletAddress: string, data: DecryptedData): EncryptedData => {
    const key = this._deriveKeyFromAddress(walletAddress);
    const iv = randomBytes(16); // Initialization vector for AES
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");
    return {
      iv: iv.toString("hex"),
      data: encrypted,
    };
  };

  // Decrypt data using the derived key
  private _decrypt(
    walletAddress: string,
    encryptedData: EncryptedData
  ): DecryptedData {
    const key = this._deriveKeyFromAddress(walletAddress);
    const decipher = createDecipheriv(
      "aes-256-cbc",
      key,
      Buffer.from(encryptedData.iv, "hex")
    );
    let encodedDecryptedData = decipher.update(
      encryptedData.data,
      "hex",
      "utf8"
    );
    encodedDecryptedData += decipher.final("utf8");
    const decryptedData: DecryptedData = JSON.parse(encodedDecryptedData);

    return decryptedData;
  }

  async appendNewData(
    request: AppendNewDataRequest
  ): Promise<AppendNewDataResponse> {
    const decryptedData = this._decrypt(
      request.walletAddress,
      request.currentData
    );

    Object.assign(decryptedData.data, request.newData);

    // Encrypt the updated health data
    const encryptedData = this._encrypt(request.walletAddress, decryptedData);

    return { encryptedData };
  }

  //TODO: Fix typings
  async verifyChallenge(
    request: VerifyChallengeRequest
  ): Promise<VerifyChallengeResponse> {
    if (!request.encryptedData) {
      console.error("User has no current data");
      return { isMet: false, error: "User has no current data" };
    }

    const encryptedData = JSON.parse(request.encryptedData);

    const decryptedData = this._decrypt(request.walletAddress, encryptedData);

    // Check if the challenge data is present and meets criteria
    const challengeData = decryptedData.data.find(
      (data) => data.name === request.challenge.feature
    );

    if (!challengeData) {
      return { isMet: false, error: "Challenge data not found" };
    }

    const isMet = challengeData.entires.some(
      (entry) =>
        entry.timestamp === request.challenge.timestamp &&
        entry.value >= request.challenge.requiredValue
    );

    // Return a flag indicating whether the challenge criteria are met
    return { isMet };
  }
}
