import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';

export class RemoveMotorcycleFromCompanyUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(motorcycleId: string): Promise<void | Error> {
    const motorcycle =
      await this.motorcycleRepository.findOneById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    motorcycle.removeFromCompany();

    await this.motorcycleRepository.update(motorcycle);
  }
}
