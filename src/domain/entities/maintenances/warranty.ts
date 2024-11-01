import { Maintenances } from '@triumph-motorcycles/domain/errors';

const { InvalidWarrantyError } = Maintenances;

export class Warranty {
  constructor(
    public id: string,
    public motorcycleId: string,
    public startDate: Date,
    public endDate: Date,
    public coverageDetails: string,
    public isActive: boolean,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new InvalidWarrantyError(
        "L'identifiant de la garantie ne peut pas être vide.",
      );
    }
    if (!this.motorcycleId) {
      throw new InvalidWarrantyError(
        "L'identifiant de la motocyclette ne peut pas être vide.",
      );
    }
    if (!(this.startDate instanceof Date) || isNaN(this.startDate.getTime())) {
      throw new InvalidWarrantyError('La date de début est invalide.');
    }
    if (!(this.endDate instanceof Date) || isNaN(this.endDate.getTime())) {
      throw new InvalidWarrantyError('La date de fin est invalide.');
    }
    if (this.startDate >= this.endDate) {
      throw new InvalidWarrantyError(
        'La date de début doit être antérieure à la date de fin.',
      );
    }
  }

  isWarrantyValid(checkDate: Date): boolean {
    return (
      checkDate >= this.startDate && checkDate <= this.endDate && this.isActive
    );
  }

  isRepairCovered(repairDate: Date): boolean {
    return this.isWarrantyValid(repairDate);
  }
}
