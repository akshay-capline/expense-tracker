import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseGateway } from './expense.gateway';

describe('ExpenseGateway', () => {
  let gateway: ExpenseGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseGateway],
    }).compile();

    gateway = module.get<ExpenseGateway>(ExpenseGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
