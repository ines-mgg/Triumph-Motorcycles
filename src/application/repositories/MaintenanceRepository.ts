import { MaintenanceEntity } from "@triumph-motorcycles/domain/entities/maintenances";

export interface MaintenanceRepository {
  save(maintenance: MaintenanceEntity): Promise<void>;
  findById(id: string): Promise<MaintenanceEntity | null>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<MaintenanceEntity[]>;
}
