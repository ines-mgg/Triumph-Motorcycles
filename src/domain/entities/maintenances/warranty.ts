export class Warranty {
  constructor(
    public id: string,
    public motorcycleId: string,
    public startDate: Date,
    public endDate: Date,
    public coverageDetails: string,
    public isActive: boolean,
  ) {}

  // Check if the warranty is valid for the given date
  isWarrantyValid(checkDate: Date): boolean {
    return (
      checkDate >= this.startDate && checkDate <= this.endDate && this.isActive
    );
  }

  // Additional method to check if a specific repair is covered
  isRepairCovered(repairDate: Date): boolean {
    return this.isWarrantyValid(repairDate);
  }
}
