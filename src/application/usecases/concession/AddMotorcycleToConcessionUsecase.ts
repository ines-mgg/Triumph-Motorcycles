import { ConcessionRepositoryInterface } from '@triumph-motorcycles/application/repositories/ConcessionRepositoryInterface';
import { MotorcycleRepositoryInterface } from '@triumph-motorcycles/application/repositories/MotorcycleRepositoryInterface';
import { ConcessionEntity } from '@triumph-motorcycles/domain/entities/concession/ConcessionEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class AddMotorcycleToConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface,
    private readonly motorcycleRepository: MotorcycleRepositoryInterface,
  ) {}

  public async execute(
    concessionId: string,
    motorcycleId: string,
  ): Promise<void | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      const motorcycle = await this.motorcycleRepository.findById(motorcycleId);
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
