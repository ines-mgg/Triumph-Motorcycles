import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';

export class UpdateServiceDetailsUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(
    id: string,
    newServiceMileage: number,
    serviceDate: Date,
  ): Promise<void | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (motorcycle instanceof Error) return motorcycle;

    motorcycle.updateServiceDetails(newServiceMileage, serviceDate);

    await this.motorcycleRepository.save(motorcycle);
  }
}
