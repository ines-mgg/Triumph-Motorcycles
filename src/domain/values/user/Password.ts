import { PasswordDoesNotIncludeLowercaseLetterError } from '@triumph-motorcycles/domain/errors/user/PasswordDoesNotIncludeLowercaseLetterError';
import { PasswordDoesNotIncludeNumberError } from '@triumph-motorcycles/domain/errors/user/PasswordDoesNotIncludeNumberError';
import { PasswordDoesNotIncludeSymbolError } from '@triumph-motorcycles/domain/errors/user/PasswordDoesNotIncludeSymbolError';
import { PasswordDoesNotIncludeUppercaseLetterError } from '@triumph-motorcycles/domain/errors/user/PasswordDoesNotIncludeUppercaseLetterError';
import { PasswordTooShortError } from '@triumph-motorcycles/domain/errors/user/PasswordTooShortError';
import { Value } from '../Value';

export class Password implements Value<string> {
  private constructor(private readonly hashedValue: string) {}

  public static from(value: string): Password | Error {
    if (value.length < 8) return new PasswordTooShortError();

    if (!/(?=\d)/.test(value)) return new PasswordDoesNotIncludeNumberError();

    // if (!/(?=[a-z])/.test(value)) return new PasswordDoesNotIncludeLowercaseLetterError();

    if (!/(?=[A-Z])/.test(value))
      return new PasswordDoesNotIncludeUppercaseLetterError();

    // if (!/(?=[^a-zA-Z0-9])/.test(value)) return new PasswordDoesNotIncludeSymbolError();

    return new Password(value);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.hashedValue;
  }

  public isValue(value: string): boolean {
    return value === this.hashedValue;
  }

  public get value(): string {
    return this.hashedValue;
  }
}
