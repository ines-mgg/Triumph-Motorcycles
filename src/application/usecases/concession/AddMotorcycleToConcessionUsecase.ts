import { ConcessionRepository } from '@triumph-motorcycles/application/repositories';
import { ConcessionEntity, MotorcycleEntity } from '@triumph-motorcycles/domain/entities';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';


export class AddMotorcycleToConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository,
  ) {}

  public async execute(
    concessionId: string,
    motorcycle: MotorcycleEntity,
  ): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      concession.addMotorcycle(motorcycle);
      await this.concessionRepository.save(concession);
      return concession;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
