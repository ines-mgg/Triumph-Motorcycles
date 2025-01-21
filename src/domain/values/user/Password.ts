import bcrypt from "bcrypt";
import { PasswordTooShortError } from "../../errors/user/PasswordTooShortError";
import { Value } from "../Value";
import { PasswordDoesNotIncludeNumberError } from "../../errors/user/PasswordDoesNotIncludeNumberError";
import { PasswordDoesNotIncludeLowercaseLetterError } from "../../errors/user/PasswordDoesNotIncludeLowercaseLetterError";
import { PasswordDoesNotIncludeUppercaseLetterError } from "../../errors/user/PasswordDoesNotIncludeUppercaseLetterError";
import { PasswordDoesNotIncludeSymbolError } from "../../errors/user/PasswordDoesNotIncludeSymbolError";

export class Password implements Value<string> {
  private constructor(private readonly hashedValue: string) {}

  public static from(value: string): Password | Error {
    if (value.length < 8) return new PasswordTooShortError();

    if (!/(?=\d)/.test(value)) return new PasswordDoesNotIncludeNumberError();

    if (!/(?=[a-z])/.test(value)) return new PasswordDoesNotIncludeLowercaseLetterError();

    if (!/(?=[A-Z])/.test(value)) return new PasswordDoesNotIncludeUppercaseLetterError();

    if (!/(?=[^a-zA-Z0-9])/.test(value)) return new PasswordDoesNotIncludeSymbolError();

    const hashedValue = bcrypt.hashSync(value, 10); 
    return new Password(hashedValue);
  }

  public compare(plainValue: string): boolean {
    return bcrypt.compareSync(plainValue, this.hashedValue);
  }

  public is(item: Value<string>): boolean {
    return item.value === this.hashedValue;
  }

  public isValue(value: string): boolean {
    return bcrypt.compareSync(value, this.hashedValue);
  }

  public get value(): string {
    return this.hashedValue;
  }
}
