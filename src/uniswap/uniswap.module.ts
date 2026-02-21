import { Module } from '@nestjs/common';
import { UniswapService } from './uniswap.service';
import { UniswapController } from './uniswap.controller';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [BlockchainModule],
  controllers: [UniswapController],
  providers: [UniswapService],
})
export class UniswapModule {}
