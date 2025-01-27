import { BreakdownEntity } from '@triumph-motorcycles/domain/entities';
import { BreakdownRepository } from '@triumph-motorcycles/application/repositories';
import { BreakdownNotFoundError } from '@triumph-motorcycles/domain/errors';

export class GetBreakdownsByMotorcycleIdUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(
    motorcycleId: string,
  ): Promise<BreakdownEntity[] | BreakdownNotFoundError> {
    return await this.breakdownRepository.findByMotorcycleId(motorcycleId);
  }
}
