import { ConcessionRepository } from "@triumph-motorcycles/application/repositories/ConcessionRepository";
import { UnexpectedError } from "@triumph-motorcycles/domain/errors/user/UnexpectedError";


export class RemoveMotorcycleFromConcessionUsecase {
    public constructor(
      private readonly concessionRepository: ConcessionRepository
    ) {}
  
    public async execute(
      concessionId: string,
      motorcycleId: string
    ): Promise<void | Error> {
      try {
        const concession = await this.concessionRepository.findById(concessionId);
        if (concession instanceof Error) return concession;
  
        concession.removeMotorcycle(motorcycleId);
        return await this.concessionRepository.removeMotorcycle(concessionId, motorcycleId);
      } catch (error) {
        return new UnexpectedError(error instanceof Error ? error.message : String(error));
      }
    }
  }