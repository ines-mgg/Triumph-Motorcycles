import { BreakdownRepository } from '@triumph-motorcycles/application/repositories/BreakdownRepository';
import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity';

export class GetAllBreakdownsTrialUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownRepository.all();
  }
}
