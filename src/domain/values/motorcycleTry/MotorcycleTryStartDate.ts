import { MotorcycleTryStartDateError } from '@triumph-motorcycles/domain/errors/motorcycleTry/MotorcycleTryStartDateError';
import { Value } from '../Value';

export class StartDate implements Value<Date> {
  constructor(public readonly value: Date) {}

  public static from(value: Date): StartDate | MotorcycleTryStartDateError {
    const now = new Date();
    if (value < now) {
      return new MotorcycleTryStartDateError();
    }
    return new StartDate(value);
  }

  public is(item: Value<Date>): boolean {
    return this.value === item.value;
  }

  public isValue(value: Date): boolean {
    return this.value.getTime() === value.getTime();
  }
}
