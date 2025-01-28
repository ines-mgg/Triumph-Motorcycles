import { DriverEntity } from '@triumph-motorcycles/domain/entities/drives/DriverEntity';
import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleEntity';
import { MotorcycleTryEntity } from '@triumph-motorcycles/domain/entities/drives/MotorcycleTryEntity';
import { MotorcycleTryRepository } from '@triumph-motorcycles/application/repositories/MotorcycleTryRepository';

export class CreateMotorcycleTryUsecase {
  constructor(
    private readonly motorcycleTryRepository: MotorcycleTryRepository,
  ) {}

  public async execute(
    motorcycle: MotorcycleEntity,
    driver: DriverEntity,
    startDate: Date,
    endDateDate: Date,
  ): Promise<void | Error> {
    const motorcycleTry = MotorcycleTryEntity.create(
      motorcycle,
      driver,
      startDate,
      endDateDate,
    );

    if (motorcycleTry instanceof Error) return motorcycleTry;

    await this.motorcycleTryRepository.save(motorcycleTry);
  }
}
