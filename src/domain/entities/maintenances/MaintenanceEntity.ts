import { v4 as uuidv4 } from 'uuid';
import { MotorcycleEntity } from '../drives/MotorcycleEntity';
import { MaintenanceIntervalMileage } from '@triumph-motorcycles/domain/values/maintenance/MaintenanceIntervalMileage';
import { MaintenanceIntervalTime } from '@triumph-motorcycles/domain/values/maintenance/MaintenanceIntervalTime';

export class MaintenanceEntity {
  private constructor(
    public readonly id: string,
    public readonly motorcycle: MotorcycleEntity,
    public readonly maintenanceIntervalMileage: MaintenanceIntervalMileage,
    public readonly maintenanceIntervalTime: MaintenanceIntervalTime,
  ) {}

  public static create(
    motorcycle: MotorcycleEntity,
    maintenanceIntervalMileage: number,
    maintenanceIntervalTime: number,
  ): MaintenanceEntity | Error {
    const id = uuidv4();

    const mileage = MaintenanceIntervalMileage.from(maintenanceIntervalMileage);
    if (mileage instanceof Error) return mileage;

    const time = MaintenanceIntervalTime.from(maintenanceIntervalTime);
    if (time instanceof Error) return time;

    return new MaintenanceEntity(id, motorcycle, mileage, time);
  }

  public scheduleNextMaintenance(): void {
    const nextMileage =
      this.motorcycle.nextServiceMileage +
      this.maintenanceIntervalMileage.value;

    const lastServiceDate = this.motorcycle.lastServiceDate || new Date();
    const nextServiceDate = new Date(lastServiceDate);
    nextServiceDate.setDate(
      nextServiceDate.getDate() + this.maintenanceIntervalTime.value,
    );

    this.motorcycle.updateServiceDetails(nextMileage, nextServiceDate);
  }

  public needsMaintenance(): boolean {
    const mileageCheck = this.motorcycle.needsService();
    const timeCheck = this.motorcycle.lastServiceDate
      ? (new Date().getTime() - this.motorcycle.lastServiceDate.getTime()) /
          (1000 * 3600 * 24) >=
        this.maintenanceIntervalTime.value
      : false;

    return mileageCheck || timeCheck;
  }
}
