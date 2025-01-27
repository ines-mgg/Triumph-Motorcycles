import { MotorcycleTryRepository } from '@triumph-motorcycles/application/repositories';
export class GetMotorcycleTrySummaryUsecase {
  constructor(
    private readonly motorcycleTryRepository: MotorcycleTryRepository,
  ) {}

  public async execute(id: string): Promise<string | Error> {
    const motorcycleTry = await this.motorcycleTryRepository.findOneById(id);

    if (motorcycleTry instanceof Error) return motorcycleTry;

    return motorcycleTry.getTestSummary();
  }
}
