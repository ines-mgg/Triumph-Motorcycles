import { ConcessionRepository } from '@triumph-motorcycles/application/repositories';
import {
  ConcessionEntity,
  UserEntity,
} from '@triumph-motorcycles/domain/entities';
import { UnexpectedError } from '@triumph-motorcycles/domain/errors';

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
