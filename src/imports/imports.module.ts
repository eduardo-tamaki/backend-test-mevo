import { Module } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { importsProviders } from './imports.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ImportsService, ...importsProviders],
  exports: [ImportsService],
})
export class ImportsModule {}
