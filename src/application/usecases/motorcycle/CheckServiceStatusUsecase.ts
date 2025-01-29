import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';
export class CheckServiceStatusUsecase {
  constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async execute(id: string): Promise<boolean | Error> {
    const motorcycle = await this.motorcycleRepository.findOneById(id);

    if (motorcycle instanceof Error) return motorcycle;

    return motorcycle.needsService();
  }
}
