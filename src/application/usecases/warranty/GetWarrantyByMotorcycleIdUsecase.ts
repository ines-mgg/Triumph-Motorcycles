import { WarrantyRepository } from '@triumph-motorcycles/application/repositories';
import { WarrantyEntity } from '@triumph-motorcycles/domain/entities';

export class GetWarrantyByMotorcycleIdUsecase {
  constructor(private readonly warrantyRepository: WarrantyRepository) {}

  public async execute(
    motorcycleId: string,
  ): Promise<WarrantyEntity[] | Error> {
    return await this.warrantyRepository.findByMotorcycleId(motorcycleId);
  }
}
