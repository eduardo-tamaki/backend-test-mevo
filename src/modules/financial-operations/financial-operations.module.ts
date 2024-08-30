import { Module } from '@nestjs/common';
import * as controller from './controllers';

@Module({
  imports: [],
  controllers: [controller.FinancialOperationsController],
  providers: [],
})
export class FinancialOperationsModule {}
