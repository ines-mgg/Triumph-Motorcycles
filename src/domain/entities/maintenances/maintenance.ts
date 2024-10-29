import { Motorcycle } from '../drives/motorcycle';

export class Maintenance {
  constructor(
    public id: string,
    public motorcycle: Motorcycle,
    public maintenanceIntervalMileage: number,
    public maintenanceIntervalTime: number,
  ) {}

  scheduleNextMaintenance(): void {
    const nextMileage =
      this.motorcycle.mileage + this.maintenanceIntervalMileage;
    const nextServiceDate = new Date(
      this.motorcycle.lastServiceDate || new Date(),
    );
    nextServiceDate.setDate(
      nextServiceDate.getDate() + this.maintenanceIntervalTime, 
    );
  
    this.motorcycle.updateServiceDetails(nextMileage, nextServiceDate);
  }

  needsMaintenance(): boolean | null {
    return (
      this.motorcycle.needsService() || 
      (this.motorcycle.lastServiceDate &&
        (new Date().getTime() - this.motorcycle.lastServiceDate.getTime()) /
          (1000 * 3600 * 24) >=
          this.maintenanceIntervalTime)
    );
  }
}
