import { WarrantyRepository } from '@triumph-motorcycles/application/repositories/WarrantyRepository';
import { WarrantyEntity } from '@triumph-motorcycles/domain/entities/maintenances/WarrantyEntity';

export class GetWarrantyByIdUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepository) {}

  public async execute(id: string): Promise<WarrantyEntity | Error> {
    return await this.warrantyRepository.findById(id);
  }
}
