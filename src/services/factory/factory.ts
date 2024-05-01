import {
    UpdateHealthDataRequest,
    UpdateHealthDataResponse,
} from "../@interfaces/updateHealthData";
import { CryptoService } from "../crypto/crypto";
import { GoogleFitService } from "../google/google";
import { IPNSService } from "../ipns/ipns";

export class ServiceFactory {
  private googleService: GoogleFitService;
  private storageService: IPNSService;
  private cryptoService: CryptoService;

  constructor() {
    this.googleService = new GoogleFitService();
    this.storageService = new IPNSService();
    this.cryptoService = new CryptoService();
  }

  async updateHealthData(
    request: UpdateHealthDataRequest
  ): Promise<UpdateHealthDataResponse> {
    //TODO: Fetch token from google api and reference from NFT
    const token = "";

    const [googleDataResult, storageDataResult] = await Promise.all([
      this.googleService.getGoogleData({ token }),
      this.storageService.fetchData({
        reference: request.reference,
      }),
    ]);

    //TODO: Emit events through websocket.io
    const response = await this.cryptoService.appendNewData({
      currentData: storageDataResult.data,
      newData: googleDataResult.userData,
      walletAddress: request.address,
    });

    const { cid } = await this.storageService.updateData({
      data: response.encryptedData,
    });

    const updated = await this.storageService.updateReference({
      reference: request.reference,
      content: cid,
    });

    return updated;
  }

  async claimChallenge() {}
}
