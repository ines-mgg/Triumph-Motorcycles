export class Motorcycle {
  constructor(
    public id: string,
    public model: string,
    public mileage: number,
    public status: 'Available' | 'InMaintenance' | 'OnTest' | 'Sold',
    public purchaseDate: Date,
    public lastServiceDate: Date | null,
    public nextServiceMileage: number,
    public managerId: string,
  ) {}

  // Update the motorcycle mileage
  updateMileage(newMileage: number): void {
    if (newMileage > this.mileage) {
      this.mileage = newMileage;
    }
  }

  // Check if service is needed
  needsService(): boolean {
    return this.mileage >= this.nextServiceMileage;
  }

  // Update the next service mileage and date
  updateServiceDetails(newServiceMileage: number, serviceDate: Date): void {
    this.nextServiceMileage = newServiceMileage;
    this.lastServiceDate = serviceDate;
  }
}
