import { ConcessionRepository } from "@triumph-motorcycles/application/repositories/ConcessionRepository";
import { ConcessionEntity } from "@triumph-motorcycles/domain/entities/concession/ConcessionEntity";


export class GetConcessionDetailsUseCase {
  public constructor(
    private readonly concessionRepository: ConcessionRepository
  ) {}

  async execute(id: string): Promise<ConcessionEntity | Error> {
    return await this.concessionRepository.findById(id);
  }
}
