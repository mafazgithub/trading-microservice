// src/uniswap/uniswap.service.ts

import { Injectable } from '@nestjs/common';
import { Contract, formatUnits } from 'ethers';
import { ProviderService } from '../blockchain/provider.service';

@Injectable()
export class UniswapService {
  getReturn(from: string, to: string, amountIn: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly providerService: ProviderService) {}

  async getBlockNumber() {
    return await this.providerService.getProvider().getBlockNumber();
  }

  async getBalance(address: string) {
    const balance = await this.providerService
      .getProvider()
      .getBalance(address);
    return formatUnits(balance, 18);
  }

  async callContract(address: string, abi: any, method: string, args: any[]) {
    const contract = new Contract(
      address,
      abi,
      this.providerService.getProvider(),
    );

    return await contract[method](...args);
  }
}
