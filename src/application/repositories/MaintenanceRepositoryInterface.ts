import { MaintenanceEntity } from "@triumph-motorcycles/domain/entities/maintenance/MaintenanceEntity";
import { MaintenanceNotFoundError } from "@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError";


export interface MaintenanceRepositoryInterface {
  save(maintenance: MaintenanceEntity): Promise<void>;
  findById(id: string): Promise<MaintenanceEntity | MaintenanceNotFoundError>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<MaintenanceEntity[] | MaintenanceNotFoundError>;
  findByMotorcycleId(motorcycleId: string): Promise<MaintenanceEntity[] | MaintenanceNotFoundError>;
  findByConcessionId(concessionId: string): Promise<MaintenanceEntity[] | MaintenanceNotFoundError>;
  findOverdue(): Promise<MaintenanceEntity[]>;
  update(maintenance: MaintenanceEntity): Promise<void>;
  scheduleNextMaintenance(maintenance: MaintenanceEntity): Promise<void | Error>;
}
