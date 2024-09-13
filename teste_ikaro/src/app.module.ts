import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancasModule } from './financas/financas.module';

@Module({
  imports: [FinancasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
