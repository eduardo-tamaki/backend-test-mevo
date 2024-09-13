import { Module } from '@nestjs/common';
import { FinancasService } from './financas.service';
import { FinancasController } from './financas.controller';

@Module({
  controllers: [FinancasController],
  providers: [FinancasService],
})
export class FinancasModule {}
