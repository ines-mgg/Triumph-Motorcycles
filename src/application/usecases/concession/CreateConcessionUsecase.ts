import { ConcessionRepository } from "src/application/repositories/ConcessionRepository";
import { ConcessionEntity } from "src/domain/entities/concession/ConcessionEntity";
import { UserEntity } from "src/domain/entities/user/UserEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class CreateConcessionUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository
  ) {}

  public async execute(
    nameValue: string,
    user: UserEntity
  ): Promise<ConcessionEntity | Error> {
    try {
      const newConcession = ConcessionEntity.create(nameValue, user);
      if (newConcession instanceof Error) return newConcession;

      await this.concessionRepository.save(newConcession);
      return newConcession;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}



