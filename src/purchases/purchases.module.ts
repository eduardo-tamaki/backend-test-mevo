import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { purchasesProviders } from './purchases.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [PurchasesService, ...purchasesProviders],
  exports: [PurchasesService],
})
export class PurchasesModule {}
