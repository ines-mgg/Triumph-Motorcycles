import { MaintenanceNotificationMessageError } from '@triumph-motorcycles/domain/errors';
import { Value } from '../Value';

const MAX_MESSAGE_LENGTH = 10000;

export class MaintenanceNotificationMessage implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): MaintenanceNotificationMessage | Error {
    if (!value) {
      return new MaintenanceNotificationMessageError();
    }

    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(value)) {
      return new MaintenanceNotificationMessageError();
    }

    if (value.length > MAX_MESSAGE_LENGTH) {
      return new MaintenanceNotificationMessageError();
    }

    return new MaintenanceNotificationMessage(value);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
