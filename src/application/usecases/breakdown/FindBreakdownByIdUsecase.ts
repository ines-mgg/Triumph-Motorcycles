import { BreakdownRepositoryInterface } from '@triumph-motorcycles/application/repositories/BreakdownRepositoryInterface';
import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/breakdown/BreakdownEntity';

export class FindBreakdownByIdUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
  ) {}

  public async execute(breakdownId: string): Promise<BreakdownEntity | Error> {
    return await this.breakdownRepository.findOneById(breakdownId);
  }
}
