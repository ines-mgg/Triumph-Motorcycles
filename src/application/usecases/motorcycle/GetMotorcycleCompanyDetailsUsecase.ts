import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';

export class GetMotorcycleCompanyDetailsUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(motorcycleId: string): Promise<object | null | Error> {
    const motorcycle =
      await this.motorcycleRepository.findOneById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    return motorcycle.getCompanyDetails();
  }
}
