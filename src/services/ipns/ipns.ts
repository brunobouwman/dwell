import {
  StorageGetRequest,
  StorageGetResponse,
  StorageService,
  StorageUpdateRequest,
  StorageUpdateResponse,
  UpdateReferenceRequest,
  UpdateReferenceResponse,
} from "../@interfaces/storage";

export class IPNSService implements StorageService {
  constructor() {}

  async updateData(
    request: StorageUpdateRequest
  ): Promise<StorageUpdateResponse> {
    return { cid: "", error: "" };
  }

  async updateReference(
    request: UpdateReferenceRequest
  ): Promise<UpdateReferenceResponse> {
    return {
      updated: true,
    };
  }

  async fetchData(request: StorageGetRequest): Promise<StorageGetResponse> {
    return {
      data: { data: "", iv: "" },
      error: null,
    };
  }
}
