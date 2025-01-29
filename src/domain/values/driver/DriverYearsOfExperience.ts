import { ExperienceError } from '@triumph-motorcycles/domain/errors/drivers';
import { Value } from '../Value';

export class DriverYearsOfExperience implements Value<number> {
  private constructor(public readonly value: number) {}

  public static from(value: number): DriverYearsOfExperience | ExperienceError {
    if (value < 3) {
      return new ExperienceError();
    }
    return new DriverYearsOfExperience(value);
  }

  public is(item: Value<number>): boolean {
    return this.value === item.value;
  }

  public isValue(value: number): boolean {
    return value === this.value;
  }
}
