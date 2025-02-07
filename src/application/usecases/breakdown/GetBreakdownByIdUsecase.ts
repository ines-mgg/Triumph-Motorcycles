import { BreakdownRepository } from "@triumph-motorcycles/application/repositories/BreakdownRepository";
import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances/BreakdownEntity";


export class GetBreakdownsByMotorcycleIdUsecase {
  constructor(
    private readonly breakdownRepository: BreakdownRepository,
  ) {}

  public async execute(motorcycleId: string): Promise<BreakdownEntity[] | Error> {
    return await this.breakdownRepository.findByMotorcycleId(motorcycleId);
  }
}
