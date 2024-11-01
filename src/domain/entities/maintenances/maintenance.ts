import { Motorcycle } from '@triumph-motorcycles/domain/entities/drives';
import { Maintenances } from '@triumph-motorcycles/domain/errors';

const { MissingMotorcycleError, InvalidMaintenanceIntervalError } =
  Maintenances;
export class Maintenance {
  constructor(
    public id: string,
    public motorcycle: Motorcycle,
    public maintenanceIntervalMileage: number,
    public maintenanceIntervalTime: number,
  ) {
    if (!motorcycle) {
      throw new MissingMotorcycleError(
        'Motorcycle cannot be null or undefined.',
      );
    }
    if (maintenanceIntervalMileage <= 0) {
      throw new InvalidMaintenanceIntervalError(
        'Maintenance interval mileage must be positive.',
      );
    }
    if (maintenanceIntervalTime <= 0) {
      throw new InvalidMaintenanceIntervalError(
        'Maintenance interval time must be positive.',
      );
    }
  }

  scheduleNextMaintenance(): void {
    const nextMileage =
      this.motorcycle.mileage + this.maintenanceIntervalMileage;

    const lastServiceDate = this.motorcycle.lastServiceDate || new Date();
    const nextServiceDate = new Date(lastServiceDate);
    nextServiceDate.setDate(
      nextServiceDate.getDate() + this.maintenanceIntervalTime,
    );

    this.motorcycle.updateServiceDetails(nextMileage, nextServiceDate);
  }

  needsMaintenance(): boolean {
    const mileageCheck = this.motorcycle.needsService();
    const timeCheck = this.motorcycle.lastServiceDate
      ? (new Date().getTime() - this.motorcycle.lastServiceDate.getTime()) /
          (1000 * 3600 * 24) >=
        this.maintenanceIntervalTime
      : false;

    return mileageCheck || timeCheck;
  }
}
