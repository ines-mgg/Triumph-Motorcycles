import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/motorcycle/MotorcycleEntity';

export class UpdateMotorcycleUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
  ) {}

  public async execute(motorcycle: MotorcycleEntity): Promise<void | Error> {
    await this.motorcycleRepository.update(motorcycle);
  }
}
