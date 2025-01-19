import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { WarrantyRepository } from "../../repositories/WarrantyRepository";

export class GetWarrantyByMotorcycleIdUsecase {
  constructor(
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  public async execute(motorcycleId: string): Promise<WarrantyEntity[]> {
    return await this.warrantyRepository.findByMotorcycleId(motorcycleId);
  }
}
