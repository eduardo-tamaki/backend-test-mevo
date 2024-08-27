import { Module } from '@nestjs/common';
import { ImportacoesService } from './importacoes.service';
import { ImportacoesController } from './importacoes.controller';

@Module({
  controllers: [ImportacoesController],
  providers: [ImportacoesService],
})
export class ImportacoesModule {}
