import { ConcessionRepository } from "src/application/repositories/ConcessionRepository";
import { ConcessionEntity } from "src/domain/entities/concession/ConcessionEntity";
import { UnexpectedError } from "src/domain/errors/user/UnexpectedError";

export class RemoveMotorcycleFromConcessionUsecase {
    public constructor(
      private readonly concessionRepository: ConcessionRepository
    ) {}
  
    public async execute(
      concessionId: string,
      motorcycleId: string
    ): Promise<ConcessionEntity | Error> {
      try {
        const concession = await this.concessionRepository.findById(concessionId);
        if (concession instanceof Error) return concession;
  
        concession.removeMotorcycle(motorcycleId);
        await this.concessionRepository.save(concession);
        return concession;
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }