import { WarrantyRepositoryInterface } from "@triumph-motorcycles/application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/warranty/WarrantyEntity";


export class GetWarrantyByMotorcycleIdUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(motorcycleId: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyRepository.findByMotorcycleId(motorcycleId);
  }
}
