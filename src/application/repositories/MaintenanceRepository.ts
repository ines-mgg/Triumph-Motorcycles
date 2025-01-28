import { MaintenanceEntity } from '@triumph-motorcycles/domain/entities/maintenances/MaintenanceEntity';
import { MaintenanceNotFoundError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotFoundError';

export interface MaintenanceRepository {
  save(maintenance: MaintenanceEntity): Promise<void>;
  findById(id: string): Promise<MaintenanceEntity | MaintenanceNotFoundError>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<MaintenanceEntity[] | MaintenanceNotFoundError>;
}
