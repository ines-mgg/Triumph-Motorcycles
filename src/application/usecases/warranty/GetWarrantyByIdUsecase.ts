import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { WarrantyRepository } from "../../repositories/WarrantyRepository";

export class GetWarrantyByIdUsecase {
  constructor(
    private readonly warrantyRepository: WarrantyRepository,
  ) {}

  public async execute(id: string): Promise<WarrantyEntity | null> {
    return await this.warrantyRepository.findById(id);
  }
}
