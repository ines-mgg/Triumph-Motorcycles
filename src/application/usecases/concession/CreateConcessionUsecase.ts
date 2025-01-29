import { ConcessionRepository } from '@triumph-motorcycles/application/repositories/ConcessionRepository';
import { ConcessionEntity } from '@triumph-motorcycles/domain/entities/concession/ConcessionEntity';
import { UserEntity } from '@triumph-motorcycles/domain/entities/user/UserEntity';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors/user/UnexpectedError';

export class CreateConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository,
  ) {}

  public async execute(
    nameValue: string,
    user: UserEntity,
  ): Promise<ConcessionEntity | Error> {
    try {
      const newConcession = ConcessionEntity.create(nameValue, user);
      if (newConcession instanceof Error) return newConcession;

      await this.concessionRepository.save(newConcession);
      return newConcession;
    } catch (error) {
      return new UnexpectedError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
