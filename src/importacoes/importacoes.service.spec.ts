import { Test, TestingModule } from '@nestjs/testing';
import { ImportacoesService } from './importacoes.service';

describe('ImportacoesService', () => {
  let service: ImportacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportacoesService],
    }).compile();

    service = module.get<ImportacoesService>(ImportacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
