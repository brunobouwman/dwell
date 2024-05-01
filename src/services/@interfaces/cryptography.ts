export interface Challenge {
  feature: string;
  timestamp: string;
  requiredValue: string;
}

export interface DataEntry {
  timestamp: string;
  value: string;
}

export interface Feature {
  name: string;
  entires: DataEntry[];
}

export interface EncryptedData {
  iv: string;
  data: string;
}

export interface DecryptedData {
  data: Feature[];
}

export interface AppendNewDataRequest {
  walletAddress: string;
  newData: Feature[];
  currentData: EncryptedData;
}

export interface AppendNewDataResponse {
  encryptedData: EncryptedData;
}

export interface VerifyChallengeRequest {
  walletAddress: string;
  encryptedData: any;
  challenge: Challenge;
}

export interface VerifyChallengeResponse {
  isMet: boolean;
  error?: string;
}

export interface CryptographyService {
  appendNewData: (
    request: AppendNewDataRequest
  ) => Promise<AppendNewDataResponse>;
  verifyChallenge: (
    request: VerifyChallengeRequest
  ) => Promise<VerifyChallengeResponse>;
}
