import { WarrantyEntity } from '@triumph-motorcycles/domain/entities';
import { WarrantyNotFoundError } from '@triumph-motorcycles/domain/errors';

export interface WarrantyRepository {
  save(warranty: WarrantyEntity): Promise<void>;
  findById(id: string): Promise<WarrantyEntity | WarrantyNotFoundError>;
  findByMotorcycleId(
    motorcycleId: string,
  ): Promise<WarrantyEntity[] | WarrantyNotFoundError>;
}
