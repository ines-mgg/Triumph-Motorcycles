import { MaintenanceHistoryNotFoundError } from "src/domain/errors/maintenance/MaintenanceHistoryNotFoundError";
import { MaintenanceRecord } from "../../domain/types/motorcycle";

export interface MaintenanceHistoryRepository {
  save(record: MaintenanceRecord): Promise<void>;
  findAll(): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByMotorcycleId(motorcycleId: string): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByDateRange(startDate: Date, endDate: Date): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByType(
    maintenanceType: 'Preventive' | 'Corrective',
  ): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
  findByCostRange(minCost: number, maxCost: number): Promise<MaintenanceRecord[] | MaintenanceHistoryNotFoundError>;
}
