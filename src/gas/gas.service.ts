import { Injectable } from '@nestjs/common';
import { formatUnits } from 'ethers';
import { ProviderService } from '../blockchain/provider.service';

@Injectable()
export class GasService {
  private cachedGasPrice: bigint | null = null;
  private lastUpdated = 0;

  constructor(private readonly providerService: ProviderService) {}

  async getGasPrice() {
    const now = Date.now();

    if (!this.cachedGasPrice || now - this.lastUpdated > 2000) {
      const provider = this.providerService.getProvider();
      const feeData = await provider.getFeeData();

      const gasPrice =
        feeData.gasPrice ??
        feeData.maxFeePerGas ??
        feeData.maxPriorityFeePerGas;

      if (!gasPrice) {
        throw new Error('Unable to fetch gas price');
      }

      this.cachedGasPrice = gasPrice;
      this.lastUpdated = now;
    }

    if (!this.cachedGasPrice) {
      throw new Error('Gas price not initialized');
    }

    return {
      gasPriceWei: this.cachedGasPrice.toString(),
      gasPriceGwei: formatUnits(this.cachedGasPrice, 'gwei'),
    };
  }
}
