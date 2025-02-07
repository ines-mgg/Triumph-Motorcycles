import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/motorcycle/MotorcycleEntity';
import { MotorStatus } from '@triumph-motorcycles/domain/types/motorcycle';
import { CompanyEntity } from '@triumph-motorcycles/domain/entities/company/CompanyEntity';

export class CreateMotorcycleUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
  ) {}

  public async execute(
    brand: string,
    model: string,
    year: number,
    mileage: number,
    status: MotorStatus,
    purchaseDate: Date,
    lastServiceDate: Date | null,
    nextServiceMileage: number,
    company: CompanyEntity | null = null,
  ): Promise<void | Error> {
    const motorcycle = MotorcycleEntity.create(
      null,
      brand,
      model,
      year,
      mileage,
      status,
      purchaseDate,
      lastServiceDate,
      nextServiceMileage,
      null,
      null,
      company,
    );

    if (motorcycle instanceof Error) return motorcycle;

    await this.motorcycleRepository.save(motorcycle);
  }
}
