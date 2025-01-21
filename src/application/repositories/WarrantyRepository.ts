import { WarrantyEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { WarrantyNotFoundError } from "src/domain/errors/warranty/WarrantyNotFoundError";

export interface WarrantyRepository {
  save(warranty: WarrantyEntity): Promise<void>;
  findById(id: string): Promise<WarrantyEntity | WarrantyNotFoundError>;
  findByMotorcycleId(motorcycleId: string): Promise<WarrantyEntity[] | WarrantyNotFoundError>;
}
