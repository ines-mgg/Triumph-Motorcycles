import { BreakdownEntity } from '@triumph-motorcycles/domain/entities';
export class RepairHistory {
  private readonly breakdownRecords: BreakdownEntity[] = [];

  addBreakdown(breakdown: BreakdownEntity): void {
    this.breakdownRecords.push(breakdown);
  }

  getBreakdowns(): BreakdownEntity[] {
    return this.breakdownRecords;
  }

  getBreakdownsByMotorcycle(motorcycleId: string): BreakdownEntity[] {
    return this.breakdownRecords.filter(
      (breakdown) => breakdown.motorcycle.id === motorcycleId,
    );
  }
}
