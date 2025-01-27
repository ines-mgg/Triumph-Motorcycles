import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories';

export class UpdateMileageUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(id: string, newMileage: number): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (motorcycle instanceof Error) return motorcycle;

    motorcycle.updateMileage(newMileage);
    await this.motorcycleRepository.save(motorcycle);
  }
}
