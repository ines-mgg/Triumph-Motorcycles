import { ExperienceError } from '@triumph-motorcycles/domain/errors/drivers';
import { Value } from '../Value';

export class DriverLicense implements Value<string> {
  private constructor(public readonly value: string) {}

  public static from(value: string): DriverLicense | Error {
    if (!/^[A-Z0-9]{10}$/.test(value)) {
      return new ExperienceError(
        'Invalid license format. Must be exactly 10 alphanumeric characters and contain no symbols.',
      );
    }
    return new DriverLicense(value);
  }

  public is(item: Value<string>): boolean {
    return this.value === item.value;
  }

  public isValue(value: string): boolean {
    return this.value === value;
  }
}
