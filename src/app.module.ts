import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TransacoesModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
