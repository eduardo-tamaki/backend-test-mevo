import { Module } from '@nestjs/common';
import * as controller from './controllers';
import * as useCase from './use-cases';

@Module({
  imports: [],
  controllers: [controller.FinancialOperationsController],
  providers: [useCase.OperationsValidateUseCase],
})
export class FinancialOperationsModule {}
