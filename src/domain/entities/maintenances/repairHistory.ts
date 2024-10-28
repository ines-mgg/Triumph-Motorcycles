import { Breakdown } from './breakdown';

export class RepairHistory {
  private breakdownRecords: Breakdown[] = [];

  addBreakdown(breakdown: Breakdown): void {
    this.breakdownRecords.push(breakdown);
  }

  getBreakdowns(): Breakdown[] {
    return this.breakdownRecords;
  }

  getBreakdownsByMotorcycle(motorcycleId: string): Breakdown[] {
    return this.breakdownRecords.filter(
      (breakdown) => breakdown.motorcycleId === motorcycleId,
    );
  }
}
