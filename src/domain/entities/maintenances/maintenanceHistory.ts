import { SparePart } from '../parts/sparePart';

export class MaintenanceHistory {
  private maintenanceRecords: MaintenanceRecord[] = [];

  // Add a maintenance record to the history
  addMaintenanceRecord(record: MaintenanceRecord): void {
    this.maintenanceRecords.push(record);
  }

  // Retrieve the full maintenance history
  getFullHistory(): MaintenanceRecord[] {
    return this.maintenanceRecords;
  }

  // Retrieve maintenance history for a specific motorcycle by ID
  getHistoryByMotorcycle(motorcycleId: string): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.motorcycleId === motorcycleId,
    );
  }

  // Retrieve maintenance records within a date range
  getHistoryByDateRange(startDate: Date, endDate: Date): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.date >= startDate && record.date <= endDate,
    );
  }

  // Retrieve maintenance records by type (Preventive or Corrective)
  getHistoryByType(
    maintenanceType: 'Preventive' | 'Corrective',
  ): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.maintenanceType === maintenanceType,
    );
  }

  // Retrieve maintenance records within a cost range
  getHistoryByCostRange(minCost: number, maxCost: number): MaintenanceRecord[] {
    return this.maintenanceRecords.filter(
      (record) => record.cost >= minCost && record.cost <= maxCost,
    );
  }

  // Retrieve the recent maintenance history (limit results)
  getRecentHistory(limit: number): MaintenanceRecord[] {
    return this.maintenanceRecords.slice(-limit);
  }

  // Calculate total maintenance cost for all records or for a specific motorcycle
  getTotalMaintenanceCost(motorcycleId?: string): number {
    const relevantRecords = motorcycleId
      ? this.getHistoryByMotorcycle(motorcycleId)
      : this.maintenanceRecords;

    return relevantRecords.reduce((total, record) => total + record.cost, 0);
  }

  // Summarize parts usage across maintenance history
  getPartsUsageSummary(): { part: SparePart; quantityUsed: number }[] {
    const partsUsageMap = new Map<
      string,
      { part: SparePart; quantityUsed: number }
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

// Detailed structure for each maintenance record entry
export class MaintenanceRecord {
  constructor(
    public maintenanceId: string,
    public motorcycleId: string,
    public maintenanceType: 'Preventive' | 'Corrective',
    public date: Date,
    public mileageAtService: number,
    public cost: number,
    public partsUsed: SparePart[],
    public technicianRecommendation: string,
    public managerId: string,
  ) {}
}
