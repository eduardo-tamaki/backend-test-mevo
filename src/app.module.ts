import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportacoesModule } from './importacoes/importacoes.module';

@Module({
  imports: [ImportacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
