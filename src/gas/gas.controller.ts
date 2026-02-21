//
import { Controller, Get } from '@nestjs/common';
import { GasService } from './gas.service';

@Controller('gasPrice')
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get()
  getGasPrice() {
    return this.gasService.getGasPrice();
  }
}
