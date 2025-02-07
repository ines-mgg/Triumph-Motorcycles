import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { MotorcycleEntity } from '@triumph-motorcycles/domain/entities/motorcycle/MotorcycleEntity';

export class GetMotorcycleByIdUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<MotorcycleEntity | Error> {
    return await this.motorcycleRepository.findById(id);
  }
}
