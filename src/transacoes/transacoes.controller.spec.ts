import { Test, TestingModule } from '@nestjs/testing';
import {} from './transacoes.controller';
import { TransacoesController } from './transacoes.controller';

describe('ImportacoesController', () => {
  let controller: TransacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesController],
      providers: [TransacoesController],
    }).compile();

    controller = module.get<TransacoesController>(TransacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
