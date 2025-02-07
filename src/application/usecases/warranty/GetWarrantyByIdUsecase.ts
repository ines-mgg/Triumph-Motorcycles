import { WarrantyRepositoryInterface } from "@triumph-motorcycles/application/repositories/WarrantyRepositoryInterface";
import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/warranty/WarrantyEntity";


export class GetWarrantyByIdUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepositoryInterface) {}

  async execute(id: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyRepository.findById(id);
   
  }
}
