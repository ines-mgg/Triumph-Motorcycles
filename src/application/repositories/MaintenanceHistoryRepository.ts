import { MaintenanceHistoryNotFoundError } from '@triumph-motorcycles/domain/errors';
import { MaintenanceRecord } from '@triumph-motorcycles/domain/types';

export interface MaintenanceHistoryRepository {
  save(record: MaintenanceRecord): Promise<void>;
  findAll(): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByMotorcycleId(
    motorcycleId: string,
  ): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByType(
    maintenanceType: 'Preventive' | 'Corrective',
  ): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByCostRange(
    minCost: number,
    maxCost: number,
  ): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
}
