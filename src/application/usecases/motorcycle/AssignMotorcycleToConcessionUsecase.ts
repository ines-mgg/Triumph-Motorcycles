import {
  MotorcycleRepository,
  ConcessionRepository,
} from '@triumph-motorcycles/application/repositories';

export class AssignMotorcycleToConcessionUsecase {
  constructor(
    private readonly motorcycleRepository: MotorcycleRepository,
    private readonly concessionRepository: ConcessionRepository,
  ) {}

  public async execute(
    motorcycleId: string,
    concessionId: string,
  ): Promise<void | Error> {
    const motorcycle =
      await this.motorcycleRepository.findOneById(motorcycleId);
    if (motorcycle instanceof Error) return motorcycle;

    const concession = await this.concessionRepository.findById(concessionId);
    if (concession instanceof Error) return concession;

    motorcycle.assignToConcession(concession);

    await this.motorcycleRepository.update(motorcycle);
  }
}
