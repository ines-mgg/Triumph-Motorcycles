import { MaintenanceNotificationDateError } from '@triumph-motorcycles/domain/errors/maintenance/MaintenanceNotificationDateError';
import { Value } from '../Value';

export class MaintenanceNotificationDate implements Value<Date> {
  private constructor(public readonly value: Date) {}

  public static from(value: Date): MaintenanceNotificationDate | Error {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return new MaintenanceNotificationDateError();
    }

    if (value < new Date()) {
      return new MaintenanceNotificationDateError();
    }

    return new MaintenanceNotificationDate(value);
  }

  public is(item: Value<Date>): boolean {
    return item.value.getTime() === this.value.getTime();
  }

  public isValue(value: Date): boolean {
    return this.value.getTime() === value.getTime();
  }
}
