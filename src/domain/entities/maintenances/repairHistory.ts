import { Breakdown } from './breakdown';
import { InvalidBreakdownError } from '../../errors/maintenances'; 
export class RepairHistory {
  private readonly breakdownRecords: Breakdown[] = [];

  addBreakdown(breakdown: Breakdown): void {
    if (!breakdown || !breakdown.motorcycle || !breakdown.motorcycle.id) {
      throw new InvalidBreakdownError('Le breakdown doit être valide avec une moto associée.');
    }
    this.breakdownRecords.push(breakdown);
  }

  getBreakdowns(): Breakdown[] {
    return this.breakdownRecords;
  }

  getBreakdownsByMotorcycle(motorcycleId: string): Breakdown[] {
    if (!motorcycleId) {
      throw new Error('L\'ID de la moto ne peut pas être vide.');
    }
    return this.breakdownRecords.filter(
      (breakdown) => breakdown.motorcycle.id === motorcycleId,
    );
  }
}
