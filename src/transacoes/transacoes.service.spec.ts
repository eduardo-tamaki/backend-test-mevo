import { Test, TestingModule } from '@nestjs/testing';
import { TransacoesService } from './transacoes.service';

describe('ImportacoesService', () => {
  let service: TransacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransacoesService],
    }).compile();

    service = module.get<TransacoesService>(TransacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
