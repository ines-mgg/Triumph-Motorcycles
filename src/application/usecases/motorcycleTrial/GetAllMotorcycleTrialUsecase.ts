import { MotorcycleTrialRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleTrialRepositoryInterface';
import { MotorcycleTrialEntity } from '@triumph-motorcycles/domain/entities/motorcycle/MotorcycleTrialEntity';

export class GetAllMotorcyclesTrialUsecase {
  constructor(
    private readonly motorcycleTrialRepository: MotorcycleTrialRepositoryInterface,
  ) {}

  public async execute(): Promise<MotorcycleTrialEntity[] | Error> {
    return await this.motorcycleTrialRepository.findAll();
  }
}
