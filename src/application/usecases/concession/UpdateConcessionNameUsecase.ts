import { ConcessionRepository } from "@triumph-motorcycles/application/repositories";
import { ConcessionEntity } from "@triumph-motorcycles/domain/entities";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors";


export class UpdateConcessionNameUsecase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository
  ) {}

  public async execute(
    concessionId: string,
    newNameValue: string
  ): Promise<ConcessionEntity | Error> {
    try {
      const concession = await this.concessionRepository.findById(concessionId);
      if (concession instanceof Error) return concession;

      const updatedName = concession.updateName(newNameValue);
      if (updatedName instanceof Error) return updatedName;

      await this.concessionRepository.save(concession);
      return concession;
    } catch (error) {
      return new UnexpectedError(error instanceof Error ? error.message : String(error));
    }
  }
}
