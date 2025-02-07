import { WarrantyEntity } from '@triumph-motorcycles/domain/entities/maintenances/WarrantyEntity';
import { WarrantyNotFoundError } from '@triumph-motorcycles/domain/errors/warranty/WarrantyNotFoundError';

export interface WarrantyRepository {
  save(warranty: WarrantyEntity): Promise<void>;
  findById(id: string): Promise<WarrantyEntity | WarrantyNotFoundError>;
  findByMotorcycleId(
    motorcycleId: string,
  ): Promise<WarrantyEntity[] | WarrantyNotFoundError>;
  update(
    id: string,
    coverageDetails: string,
    isActive: boolean,
  ): Promise<void | WarrantyNotFoundError>;
  remove(id: string): Promise<void> | WarrantyNotFoundError;
}
