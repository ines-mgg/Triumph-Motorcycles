import { MaintenanceRecord } from "../../domain/types/motorcycle";

export interface MaintenanceHistoryRepository {
  save(record: MaintenanceRecord): Promise<void>;
  findAll(): Promise<MaintenanceRecord[]>;
  findByMotorcycleId(motorcycleId: string): Promise<MaintenanceRecord[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<MaintenanceRecord[]>;
  findByType(
    maintenanceType: 'Preventive' | 'Corrective',
  ): Promise<MaintenanceRecord[]>;
  findByCostRange(minCost: number, maxCost: number): Promise<MaintenanceRecord[]>;
}
