import { BreakdownDescriptionError } from '@triumph-motorcycles/domain/errors/breakdown/BreakdownDescriptionError';
import { Value } from '../Value';

const MAX_MILEAGE = 100000;

export class MaintenanceIntervalMileage implements Value<number> {
  private constructor(public readonly value: number) {}

  public static from(
    value: number,
  ): MaintenanceIntervalMileage | BreakdownDescriptionError {
    if (value <= 0) {
      return new BreakdownDescriptionError();
    }
    if (value > MAX_MILEAGE) {
      return new BreakdownDescriptionError();
    }
    return new MaintenanceIntervalMileage(value);
  }

  public is(item: Value<number>): boolean {
    return item.value === this.value;
  }

  public isValue(value: number): boolean {
    return this.value === value;
  }
}
