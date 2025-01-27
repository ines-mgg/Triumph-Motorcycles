
import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories';
import { MotorStatus } from '@triumph-motorcycles/domain/types';

export class UpdateMotorcycleStatusUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(
    id: string,
    newStatus: MotorStatus,
  ): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (motorcycle instanceof Error) return motorcycle;

    motorcycle.updateStatus(newStatus);
    await this.motorcycleRepository.save(motorcycle);
  }
}
