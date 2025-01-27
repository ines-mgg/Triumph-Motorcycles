import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities';
import { MotorStatus } from '@triumph-motorcycles/domain/types';
import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories';

export class CreateMotorcycleUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(
    brand: string,
    model: string,
    year: number,
    purchaseDate: Date,
    status: MotorStatus,
  ): Promise<void | Error> {
    const motorcycle = MotorcycleEntity.create(
      brand,
      model,
      year,
      purchaseDate,
      status,
    );

    if (motorcycle instanceof Error) return motorcycle;

    await this.motorcycleRepository.save(motorcycle);
  }
}
