import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";

export class GetBreakdownsByMotorcycleIdUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepository,
  ) {}

  public async execute(motorcycleId: string): Promise<BreakdownEntity[]> {
    return await this.breakdownRepository.findByMotorcycleId(motorcycleId);
  }
}
