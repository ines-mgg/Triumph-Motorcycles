import { BreakdownEntity } from "@triumph-motorcycles/domain/entities/maintenances";
import { InvalidBreakdownError } from "../../../domain/errors/maintenances";

export class RepairHistory {
  private readonly breakdownRecords: BreakdownEntity[] = [];

  addBreakdown(breakdown: BreakdownEntity): void {
    if (!breakdown) {
      throw new InvalidBreakdownError(
        'Le breakdown doit être valide avec une moto associée.',
      );
    }
    this.breakdownRecords.push(breakdown);
  }

  getBreakdowns(): BreakdownEntity[] {
    return this.breakdownRecords;
  }

  getBreakdownsByMotorcycle(motorcycleId: string): BreakdownEntity[] {
    if (!motorcycleId) {
      throw new Error("L'ID de la moto ne peut pas être vide.");
    }
    return this.breakdownRecords.filter(
      (breakdown) => breakdown.motorcycle.id === motorcycleId,
    );
  }
}
