import { EncryptedData } from "./cryptography";

export interface StorageUpdateRequest {
  data: EncryptedData;
}

export interface StorageUpdateResponse {
  cid: string;
  error: any;
}

export interface StorageGetRequest {
  reference: string;
}

export interface StorageGetResponse {
  data: EncryptedData;
  error: any;
}

export interface UpdateReferenceRequest {
  reference: string;
  content: string;
}

export interface UpdateReferenceResponse {
  updated: boolean;
}

export interface StorageService {
  updateData: (request: StorageUpdateRequest) => Promise<StorageUpdateResponse>;
  fetchData: (request: StorageGetRequest) => Promise<StorageGetResponse>;
  updateReference: (
    request: UpdateReferenceRequest
  ) => Promise<UpdateReferenceResponse>;
}
