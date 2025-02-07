import { BreakdownRepository } from "@triumph-motorcycles/application/repositories/BreakdownRepository";
import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity";


export class FindBreakdownByIdUsecase {
  constructor(private readonly breakdownRepository: BreakdownRepository) {}

  public async execute(breakdownId: string): Promise<BreakdownEntity | Error> {
    return await this.breakdownRepository.findOneById(breakdownId);
  }
}
