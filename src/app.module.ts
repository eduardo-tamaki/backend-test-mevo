import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as modules from './modules';

@Module({
  imports: [modules.FinancialOperationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
