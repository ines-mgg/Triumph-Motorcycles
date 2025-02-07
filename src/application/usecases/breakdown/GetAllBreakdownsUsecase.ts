import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/breakdown/BreakdownEntity';
import { BreakdownRepositoryInterface } from '@triumph-motorcycles/application/repositories/BreakdownRepositoryInterface';

export class GetAllBreakdownsTrialUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
  ) {}

  public async execute(): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownRepository.findAll();
  }
}
