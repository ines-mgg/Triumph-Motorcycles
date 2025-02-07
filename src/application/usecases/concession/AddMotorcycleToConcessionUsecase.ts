import { ConcessionRepository } from '@triumph-motorcycles/application/repositories/ConcessionRepository';
import { MotorcycleRepository } from '@triumph-motorcycles/application/repositories/MotorcycleRepository';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class AddMotorcycleToConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository,
    private readonly motorcycleRepository: MotorcycleRepository,
  ) {}

  public async execute(
    concessionId: string,
    motorcycleId: string,
  ): Promise<void | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      const motorcycle = await this.motorcycleRepository.findOneById(
        motorcycleId,
      );
      if (motorcycle instanceof Error) return motorcycle;

      concession.addMotorcycle(motorcycle);

      return this.concessionRepository.addMotorcycle(
        concessionId,
        motorcycleId,
      );
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
