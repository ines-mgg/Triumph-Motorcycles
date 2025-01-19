import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export interface WarrantyRepository {
  save(warranty: WarrantyEntity): Promise<void>;
  findById(id: string): Promise<WarrantyEntity | null>;
  findByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity[]>;
}
