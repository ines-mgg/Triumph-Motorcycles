
import { ConcessionEntity } from '@triumph-motorcycles/domain/entities/concession/ConcessionEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';
import { ConcessionRepositoryInterface } from '@triumph-motorcycles/application/repositories/ConcessionRepositoryInterface';

export class UpdateConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface,
  ) {}

  public async execute(
    id: string,
    newName: string,
  ): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findById(id);
      if (concession instanceof Error) return concession;

      const updateResult = concession.updateName(newName);
      if (updateResult instanceof Error) return updateResult;

      await this.concessionRepository.update(concession);

      return concession;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
