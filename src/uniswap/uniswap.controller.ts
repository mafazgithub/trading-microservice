import { Controller, Post, Body } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Controller('return')
export class UniswapController {
  constructor(private readonly uniswapService: UniswapService) {}

  @Post()
  getReturn(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('amountIn') amountIn: string,
  ) {
    return this.uniswapService.getReturn(from, to, amountIn);
  }
}
