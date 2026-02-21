import { Injectable } from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

@Injectable()
export class ProviderService {
  private readonly provider: JsonRpcProvider;

  constructor() {
    this.provider = new JsonRpcProvider(process.env.RPC_URL);
  }

  getProvider(): JsonRpcProvider {
    return this.provider; // 🚨 THIS RETURN IS CRITICAL
  }
}
