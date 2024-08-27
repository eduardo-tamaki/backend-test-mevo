import { Test, TestingModule } from '@nestjs/testing';
import { ImportacoesController } from './importacoes.controller';
import { ImportacoesService } from './importacoes.service';

describe('ImportacoesController', () => {
  let controller: ImportacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportacoesController],
      providers: [ImportacoesService],
    }).compile();

    controller = module.get<ImportacoesController>(ImportacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
