import { InvalidMaintenanceRecordError } from '@triumph-motorcycles/domain/errors';
import { MaintenanceRecord } from '@triumph-motorcycles/domain/types';
import { SparePartEntity } from '../parts/SparePartEntity';

export class MaintenanceHistoryEntity {
  private readonly maintenanceRecords: MaintenanceRecord[] = [];

  addMaintenanceRecord(record: MaintenanceRecord): void {
    if (!record.maintenanceId || !record.motorcycleId) {
      throw new InvalidMaintenanceRecordError(
        'Maintenance ID and Motorcycle ID are required.',
      );
    }
    if (record.cost < 0) {
      throw new InvalidMaintenanceRecordError('Cost cannot be negative.');
    }
    if (!Array.isArray(record.partsUsed)) {
      throw new InvalidMaintenanceRecordError('Parts used must be an array.');
    }
    this.maintenanceRecords.push(record);
  }

  getFullHistory(): MaintenanceRecord[] {
    return this.maintenanceRecords;
  }

  getHistoryByMotorcycle(motorcycleId: string): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.motorcycleId === motorcycleId,
    );
  }

  getHistoryByDateRange(startDate: Date, endDate: Date): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.date >= startDate && record.date <= endDate,
    );
  }

  getHistoryByType(
    maintenanceType: 'Preventive' | 'Corrective',
  ): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.maintenanceType === maintenanceType,
    );
  }

  getHistoryByCostRange(minCost: number, maxCost: number): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.cost >= minCost && record.cost <= maxCost,
    );
  }

  getRecentHistory(limit: number): MaintenanceRecord[] {
    return this.maintenanceRecords.slice(-limit);
  }

  getTotalMaintenanceCost(motorcycleId?: string): number {
    const relevantRecords = motorcycleId
      ? this.getHistoryByMotorcycle(motorcycleId)
      : this.maintenanceRecords;

    return relevantRecords.reduce((total, record) => total + record.cost, 0);
  }

  getPartsUsageSummary(): { part: SparePartEntity; quantityUsed: number }[] {
    const partsUsageMap = new Map<
      string,
      { part: SparePartEntity; quantityUsed: number }
    >();

    for (const record of this.maintenanceRecords) {
      for (const part of record.partsUsed) {
        if (partsUsageMap.has(part.id)) {
          partsUsageMap.get(part.id)!.quantityUsed += 1;
        } else {
          partsUsageMap.set(part.id, { part, quantityUsed: 1 });
        }
      }
    }

    return Array.from(partsUsageMap.values());
  }
}
