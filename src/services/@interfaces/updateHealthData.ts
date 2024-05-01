export interface UpdateHealthDataRequest {
  address: string;
  reference: string;
}

export interface UpdateHealthDataResponse {
  updated: boolean;
  error?: string;
}

export interface UpdateHealthDataService {
  updateHealthData: (
    request: UpdateHealthDataRequest
  ) => Promise<UpdateHealthDataResponse>;
}
