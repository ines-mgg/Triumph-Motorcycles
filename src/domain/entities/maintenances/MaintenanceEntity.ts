import { MissingMotorcycleError } from '../../errors/drivers';
import { MaintenanceIntervalMileage } from '../../values/maintenance/MaintenanceIntervalMileage';
import { MaintenanceIntervalTime } from '../../values/maintenance/MaintenanceIntervalTime';
import { MotorcycleEntity } from '../drives';


export class MaintenanceEntity {
  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public readonly maintenanceIntervalMileage: MaintenanceIntervalMileage,
    public readonly maintenanceIntervalTime: MaintenanceIntervalTime,
  ) {}

  public static create(
    id: string,
    motorcycle: MotorcycleEntity,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
  ): MaintenanceEntity | Error {
    if (!motorcycle) {
      throw new MissingMotorcycleError('Motorcycle cannot be null or undefined.');
    }

    const mileage = MaintenanceIntervalMileage.from(maintenanceIntervalMileage);
    if (mileage instanceof Error) {
      throw mileage;
    }

    const time = MaintenanceIntervalTime.from(maintenanceIntervalTime);
    if (time instanceof Error) {
      throw time;
    }

    return new MaintenanceEntity(id, motorcycle, mileage, time);
  }

  public scheduleNextMaintenance(): void {
    const nextMileage = this.motorcycle.mileage + this.maintenanceIntervalMileage.value;

    const lastServiceDate = this.motorcycle.lastServiceDate || new Date();
    const nextServiceDate = new Date(lastServiceDate);
    nextServiceDate.setDate(nextServiceDate.getDate() + this.maintenanceIntervalTime.value);

    this.motorcycle.updateServiceDetails(nextMileage, nextServiceDate);
  }

  public needsMaintenance(): boolean {
    const mileageCheck = this.motorcycle.needsService();
    const timeCheck = this.motorcycle.lastServiceDate
      ? (new Date().getTime() - this.motorcycle.lastServiceDate.getTime()) / (1000 * 3600 * 24) >= this.maintenanceIntervalTime.value
      : false;

    return mileageCheck || timeCheck;
  }
}
