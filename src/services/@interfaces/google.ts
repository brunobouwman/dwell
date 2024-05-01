import { DataEntry, Feature } from "./cryptography";

export interface GoogleDataReponse {
  userData: Feature[];
  error: any;
}

export interface GoogleDataRequest {
  token: any;
}

export interface FetchDataRequest {
  accessToken: string;
  type: string;
  dataSourceId: string;
}

export interface FetchDataResponse {
  data: DataEntry[];
  error?: string;
}

export interface GoogleDataService {
  getGoogleData: (request: GoogleDataRequest) => Promise<GoogleDataReponse>;
}
