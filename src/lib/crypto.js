import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from "crypto";

// Derive a cryptographic key using the wallet address and a predefined salt
const deriveKeyFromAddress = (walletAddress) => {
  const salt = process.env.NEXT_PUBLIC_SALT; // Retrieve the secure salt from environment variables
  return pbkdf2Sync(walletAddress, salt, 1000, 32, "sha512");
}

// Encrypt data using the derived key
const encrypt = (walletAddress, data) => {
  const key = deriveKeyFromAddress(walletAddress);
  const iv = randomBytes(16); // Initialization vector for AES
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

// Decrypt data using the derived key
const decrypt = (walletAddress, encryptedData, iv) => {
  const key = deriveKeyFromAddress(walletAddress);
  const decipher = createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const updateHealthData = (walletAddress, newData, currentData) => {

  let healthData;

  if (currentData) {
    const { iv, data } = currentData;

    const decryptedData = decrypt(walletAddress, data, iv);

    try {
      healthData = JSON.parse(decryptedData);
    } catch (e) {
      console.error("Error parsing existing health data:", e);
      throw new Error("Invalid existing health data format");
    }
  } else {
    healthData = {}
  }

  Object.assign(healthData, newData);

  // Encrypt the updated health data
  const updatedEncryptedData = encrypt(walletAddress, JSON.stringify(healthData));

  return updatedEncryptedData;
};

const verifyChallenge = (walletAddress, encryptedData, challenge) => {

  if (!encryptedData) {
    console.error("User has no current data");
    return;
  }

  const { iv, data } = JSON.parse(encryptedData);

  const decryptedData = decrypt(walletAddress, data, iv)

  let healthData;
  try {
    healthData = JSON.parse(decryptedData);
  } catch (e) {
    console.error("Error parsing health data:", e);
    return { isValid: false, error: "Invalid data format" };
  }

  // Check if the challenge data is present and meets criteria
  const challengeData = healthData[challenge.feature];
  if (!challengeData) {
    return { isValid: false, error: "Challenge data not found" };
  }

  const isMet = challengeData.some(
    (entry) =>
      entry.timestamp === challenge.timestamp &&
      entry.value >= challenge.requiredValue
  );

  // Return a flag indicating whether the challenge criteria are met
  return { isValid: isMet };
}

// eslint-disable-next-line import/no-anonymous-default-export
export {
  deriveKeyFromAddress,
  updateHealthData,
  verifyChallenge
};
