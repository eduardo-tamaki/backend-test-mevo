import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './purchases/purchases.module';
import { ImportsModule } from './imports/imports.module';

@Module({
  imports: [PurchasesModule, ImportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
