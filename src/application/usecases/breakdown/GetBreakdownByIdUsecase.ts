import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { BreakdownRepository } from "../../repositories/BreakdownRepository";
import { BreakdownNotFoundError } from "src/domain/errors/breakdown/BreakdownNotFoundError";

export class GetBreakdownsByMotorcycleIdUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepository,
  ) {}

  public async execute(motorcycleId: string): Promise<BreakdownEntity[] | BreakdownNotFoundError> {
    return await this.breakdownRepository.findByMotorcycleId(motorcycleId);
  }
}
