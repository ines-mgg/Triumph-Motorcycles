import { ConcessionEntity } from "@triumph-motorcycles/domain/entities/concession/ConcessionEntity";
import { ConcessionRepositoryInterface } from "@triumph-motorcycles/application/repositories/ConcessionRepositoryInterface";


export class GetConcessionDetailsUseCase {
  public constructor(
    private readonly concessionRepository: ConcessionRepositoryInterface
  ) {}

  async execute(id: string): Promise<ConcessionEntity | Error> {
    return await this.concessionRepository.findById(id);
  }
}
