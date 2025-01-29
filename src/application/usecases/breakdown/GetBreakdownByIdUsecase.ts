import { BreakdownEntity } from '@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity';
import { BreakdownRepository } from '@triumph-motorcycles/application/repositories/BreakdownRepository';
import { BreakdownNotFoundError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownNotFoundError';

export class GetBreakdownsByMotorcycleIdUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(
    motorcycleId: string,
  ): Promise<BreakdownEntity[] | BreakdownNotFoundError> {
    return await this.breakdownRepository.findByMotorcycleId(motorcycleId);
  }
}
