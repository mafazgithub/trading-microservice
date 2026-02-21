import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GasModule } from './gas/gas.module';
import { UniswapModule } from './uniswap/uniswap.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GasModule, UniswapModule],
})
export class AppModule {}
