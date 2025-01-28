import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleEntity';
import { MotorStatus } from '@triumph-motorcycles/domain/types/motorcycle';
import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';

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
