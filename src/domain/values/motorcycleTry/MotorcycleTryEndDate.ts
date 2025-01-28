import { MotorcycleTryEndDateError } from '@triumph-motorcycles/domain/errors/motorcycleTry/MotorcycleTryEndDateError';
import { Value } from '../Value';

export class EndDate implements Value<Date> {
  constructor(public readonly value: Date) {}

  public static from(
    startDate: Date,
    value: Date,
  ): EndDate | MotorcycleTryEndDateError {
    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + 30);

    const timeDifference = value.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference < 0) {
      return new MotorcycleTryEndDateError();
    }

    if (daysDifference > 30) {
      return new MotorcycleTryEndDateError();
    }

    return new EndDate(value);
  }

  public is(item: Value<Date>): boolean {
    return this.value.getTime() === item.value.getTime();
  }

  public isValue(value: Date): boolean {
    return this.value.getTime() === value.getTime();
  }
}
