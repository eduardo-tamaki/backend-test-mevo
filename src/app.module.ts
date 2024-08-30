import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialOperationsModule } from './modules/financial-operations/financial-operations.module';

@Module({
  imports: [FinancialOperationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
