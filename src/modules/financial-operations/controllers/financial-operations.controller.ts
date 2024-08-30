import { Controller, Get } from '@nestjs/common';

@Controller('operations')
export class FinancialOperationsController {
  @Get()
  test(): string {
    return 'Testing controller';
  }
}
