export class Warranty {
  constructor(
    public id: string,
    public motorcycleId: string,
    public startDate: Date,
    public endDate: Date,
    public coverageDetails: string,
    public isActive: boolean,
  ) {}

  isWarrantyValid(checkDate: Date): boolean {
    return (
      checkDate >= this.startDate && checkDate <= this.endDate && this.isActive
    );
  }

  isRepairCovered(repairDate: Date): boolean {
    return this.isWarrantyValid(repairDate);
  }
}
