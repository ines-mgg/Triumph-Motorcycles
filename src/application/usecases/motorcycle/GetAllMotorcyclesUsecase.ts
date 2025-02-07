import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/motorcycle/MotorcycleEntity';

export class GetAllMotorcyclesUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
  ) {}

  public async execute(): Promise<MotorcycleEntity[] | Error> {
    return await this.motorcycleRepository.findAll();
  }
}
